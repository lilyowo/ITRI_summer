const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  AlignmentType,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} = require("docx");
const sizeOf = require("image-size");
const { Parser } = require("json2csv");

const sanitizeFileName = (fileName) => {
  return fileName.replace(/[<>:"/\\|?*]+/g, "_");
};
const ensureTempDirectory = () => {
  const tempDir = path.join(__dirname, "../temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  return tempDir;
};
const clearTempDirectory = () => {
  const tempDir = path.join(__dirname, "../temp");
  fs.readdir(tempDir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      if (file.endsWith(".png") || file.endsWith(".jpg")) {
        fs.unlink(path.join(tempDir, file), (err) => {
          if (err) throw err;
        });
      }
    }
  });
};
// for export word file image
const processImage = (chart, tempDir, children) => {
  const imagePath = path.join(tempDir, `image_${chart.chartId}.png`);
  try {
    fs.writeFileSync(imagePath, Buffer.from(chart.image, "base64"));

    // 獲取圖片尺寸並計算寬高比
    const dimensions = sizeOf(imagePath);
    const aspectRatio = dimensions.width / dimensions.height;
    const width = 500;
    const height = Math.round(width / aspectRatio);

    // 添加圖片
    children.push(
      new Paragraph({
        children: [
          new ImageRun({
            data: fs.readFileSync(imagePath),
            transformation: {
              width,
              height,
            },
          }),
        ],
        alignment: AlignmentType.CENTER,
      })
    );
  } catch (error) {
    console.log(`圖片 ${chart.chartId} 無法取得`);

    // 添加一個換行符號作為占位符
    children.push(
      new Paragraph({
        children: [],
      })
    );
  }
};

const createPdf = async (charts, fileName) => {
  const doc = new PDFDocument();
  fileName = sanitizeFileName(fileName);
  const tempDir = ensureTempDirectory();
  const filePath = path.join(tempDir, `MyPDFFile.pdf`); // 使用 fileName 生成文件名
  const writeStream = fs.createWriteStream(filePath);

  doc.pipe(writeStream);

  for (const chart of charts) {
    doc.text(chart.description);
    doc.moveDown();

    const imagePath = path.join(tempDir, `image_${chart.chartId}.png`);
    fs.writeFileSync(imagePath, Buffer.from(chart.image, "base64"));

    // Get image dimensions
    const image = fs.readFileSync(imagePath);
    const img = doc.openImage(image);
    const aspectRatio = img.width / img.height;
    const width = 500;
    const height = width / aspectRatio;

    doc.image(imagePath, {
      fit: [500, height],
      align: "center",
      valign: "top",
    });
    doc.moveDown();
  }

  doc.end();

  // 確保文件生成完畢後返回路徑
  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => resolve(filePath));
    writeStream.on("error", reject);
    clearTempDirectory();
  });
};

const createWord = async (charts, fileName) => {
  fileName = sanitizeFileName(fileName);
  const tempDir = ensureTempDirectory();
  const filePath = path.join(tempDir, `MyWordFile.docx`);

  // 創建一個數組來存儲所有的內容
  const children = [];

  for (const chart of charts) {
    // 添加標題
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: chart.dataTitle, bold: true, size: 24 }),
        ],
      })
    );

    // 添加描述
    if (chart.description) {
      children.push(
        new Paragraph({
          children: [new TextRun(chart.description)],
        })
      );
    } else {
      children.push(new Paragraph({ children: [new TextRun("")] }));
    }

    // 添加一個空行
    children.push(new Paragraph({ children: [new TextRun("")] }));
    // 處理表格
    if (chart.data && chart.data.header && chart.data.content) {
      const table = new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          new TableRow({
            children: chart.data.header.map(
              (header) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: header, bold: true })],
                    }),
                  ],
                })
            ),
          }),
          ...chart.data.content.map(
            (row) =>
              new TableRow({
                children: row.map(
                  (cell) =>
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [new TextRun(cell.toString())],
                        }),
                      ],
                    })
                ),
              })
          ),
        ],
      });
      children.push(table);
    }
    // 添加一個空行
    children.push(new Paragraph({ children: [new TextRun("")] }));

    processImage(chart, tempDir, children);

    // 添加一個空行
    children.push(new Paragraph({ children: [new TextRun("")] }));
  }

  // 創建文檔，將所有內容放在一個部分中
  const doc = new Document({
    creator: "My App Name",
    description: "Generated Report",
    title: fileName,
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  // 確保文件生成完畢後返回路徑
  return new Promise((resolve, reject) => {
    Packer.toBuffer(doc)
      .then((buffer) => {
        fs.writeFile(filePath, buffer, (err) => {
          if (err) reject(err);
          else resolve(filePath);
        });
      })
      .catch(reject);
  }).finally(() => {
    clearTempDirectory();
  });
};

// const createCsv = async (charts, fileName) => {
//   const fields = Object.keys(charts[0]).filter((field) => field !== "image");
//   const json2csvParser = new Parser({
//     fields,
//     // 添加 BOM 標記以確保 Excel 正確識別 UTF-8 編碼
//     withBOM: true,
//     // 設置分隔符為製表符，可以更好地處理包含逗號的中文文本
//     delimiter: "\t",
//   });
//   const csv = json2csvParser.parse(charts);
//   // 添加 UTF-8 BOM
//   const bom = "\uFEFF";
//   const csvWithBom = bom + csv;

//   const filePath = path.join(__dirname, "../temp", `MyCSVFile.csv`);

//   // 使用 UTF-8 編碼寫入文件
//   fs.writeFileSync(filePath, csvWithBom, { encoding: "utf8" });
//   clearTempDirectory();
//   return filePath;
// };
const createCsv = async (charts, fileName) => {
  // 處理每個 chart 對象，展平 data 字段
  const processedCharts = charts.map((chart) => {
    const flatChart = { ...chart };
    delete flatChart.image; // 移除 image 字段

    if (flatChart.data) {
      const data =
        typeof flatChart.data === "string"
          ? JSON.parse(flatChart.data)
          : flatChart.data;

      // 添加 header 列
      if (data.header) {
        data.header.forEach((header, index) => {
          flatChart[`header_${index + 1}`] = header;
        });
      }

      // 添加 content 行
      if (data.content) {
        data.content.forEach((row, rowIndex) => {
          row.forEach((cell, cellIndex) => {
            flatChart[`content_row${rowIndex + 1}_col${cellIndex + 1}`] = cell;
          });
        });
      }

      delete flatChart.data; // 移除原始的 data 字段
    }

    return flatChart;
  });

  // 獲取所有可能的字段
  const allFields = new Set();
  processedCharts.forEach((chart) => {
    Object.keys(chart).forEach((key) => allFields.add(key));
  });

  const fields = Array.from(allFields);

  const json2csvParser = new Parser({
    fields,
    withBOM: true,
    delimiter: ",", // 使用逗號作為分隔符
    quote: '"', // 使用雙引號包裹字段
    escapeQuote: '"', // 雙引號內的雙引號用兩個雙引號轉義
    excelStrings: true, // 確保Excel能正確解析包含逗號的字符串
  });

  const csv = json2csvParser.parse(processedCharts);
  const bom = "\uFEFF";
  const csvWithBom = bom + csv;

  const filePath = path.join(__dirname, "../temp", `${fileName}.csv`);

  fs.writeFileSync(filePath, csvWithBom, { encoding: "utf8" });
  clearTempDirectory();
  return filePath;
};
module.exports = {
  createPdf,
  createWord,
  createCsv,
};
