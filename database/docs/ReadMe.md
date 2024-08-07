## 進入 postgreSQL Shell

- Run `$sudo -i -u postgres`進入 postgres 用戶。 Quit by `exit`.
- Run `$psql -U newuser -h localhost -d postgres`進入創建的新用戶的shell. Quit by `\q`.
- Run `$psql`進入 root user postgres的shell. Quit by `\q`

## 快速建立schema

- Update your host IP, postgres user name, and password in config/config.json
- Make sure that your computer already install python3, psycopg2
- Run `$cd oam/database2`, `$python resetDB.py`

## Install psycopg2

- Run `$pip install psycopg2`, if lack of certain libraries try the following command

```
    $sudo apt-get update
    $sudo apt-get install libpq-dev
    $pip install psycopg2-binary
    $pip install psycopg2
```

## backslash commands

- \l 查看當前資料庫，按 Q 退出。
- \c DatabaseName 切換到指定數據庫，\dt 查看所有 table
- \d TableName 查看資料表的 column、型別
- \i + 檔案路徑 可以執行.sql 檔案
- \q 結束 quit
- \? 更多 backslash cammand 說明

# 安裝 Ubuntu 套件庫的 PostgreSQL

## 更新套件庫

    sudo apt update -y

# 安裝 PostgreSQL 相關套件

## 安裝 PostgreSQL

    sudo apt install postgresql postgresql-contrib

安裝完會自動啟動 PostgreSQL 服務，查看服務是否正常啟動

## 查看 PostgreSQL 服務狀態

    sudo systemctl status postgresql

看到 Active: active 表示已經正常啟動了

```
root@ubuntu:~# systemctl status postgresql
● postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor preset: enabled)
   Active: active (exited) since Fri 2020-08-21 13:42:23 UTC; 39s ago
 Main PID: 3335 (code=exited, status=0/SUCCESS)
    Tasks: 0 (limit: 4632)
   CGroup: /system.slice/postgresql.service

Aug 21 13:42:23 ubuntu systemd[1]: Starting PostgreSQL RDBMS...
Aug 21 13:42:23 ubuntu systemd[1]: Started PostgreSQL RDBMS.
```

## 重設postgres密碼

在`$sudo -i -u postgres`然後`$psql`以後，可以跑`$\password postgres`設定root user postgres的密碼。

## 建立新的User

在PostgreSQL中，可以通過`psql` shell來創建新用戶並設置密碼。
下面是步驟：

1. **進入`psql` shell**：

   ```sh
   sudo -i -u postgres
   psql
   ```

2. **創建新用戶並設置密碼**：
   假設你要創建的用戶名為`newuser`，密碼為`newpassword`，可以使用以下命令：

   ```sql
   CREATE USER newuser WITH PASSWORD 'newpassword';
   ```

3. **賦予新用戶必要的權限**（例如創建資料庫的權限）：

   ```sql
   ALTER USER newuser WITH CREATEDB;
   ```

4. **退出`psql` shell**：

   ```sql
   \q
   ```

5. **使用新用戶進入`psql` shell**：
   你可以使用以下命令來使用新用戶登錄`psql`：

   ```sh
   psql -U newuser -h localhost -d postgres
   ```

   在這裡：

   - `-U newuser` 指定用戶名為`newuser`
   - `-h localhost` 指定連接到本地主機（也可以是其他主機名或IP地址）
   - `-d postgres` 指定要連接的資料庫為`postgres`（你也可以指定其他你有權限的資料庫名）

   之後，系統會提示你輸入新用戶的密碼，輸入你剛設置的密碼即可進入。
   這樣，你就可以使用新創建的用戶`newuser`進入`psql` shell並進行操作了。

## 設定開機時自動啟動服務

    sudo systemctl enable postgresql
