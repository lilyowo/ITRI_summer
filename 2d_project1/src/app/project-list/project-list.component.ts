import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../models/project.model'; // 导入 Project 类型
import { Simulation } from '../models/simulation.model'; // 导入 Simulation 类型
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  //這個資料以後會從後端取得
  // projects: Project[] = [
  //   {
  //     name: 'project 1',
  //     date: '2024.07.11 04:57:00',
  //     expanded: false,
  //     simulations: [
  //       { name: '[Simulation] project 1', date: '2024.07.11 04:57:00' },
  //       // 添加更多模拟数据...
  //     ]
  //   },
  //   {
  //     name: 'project 2',
  //     date: '2024.07.11 04:57:00',
  //     expanded: false,
  //     simulations: [
  //       { name: '[Simulation] project 2', date: '2024.07.11 04:57:00' },
  //       // 添加更多模拟数据...
  //     ]
  //   },
  //   {
  //     name: 'project 3',
  //     date: '2024.07.11 04:57:00',
  //     expanded: false,
  //     simulations: [
  //       { name: '[Simulation] project 3', date: '2024.07.11 04:57:00' },
  //       // 添加更多模拟数据...
  //     ]
  //   }
  // ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {}
  showCreateModal = false;
  showDeleteModal = false;
  userId!: number;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      if (this.userId) {
        this.loadProjects(this.userId);
      }
    });
  }

  loadProjects(userId: number): void {
    this.projectService.getProjectsByUserId(userId).subscribe((projects) => {
      this.projects = projects;
      this.loadReportsForProjects();
    });
  }

  loadReportsForProjects(): void {
    this.projects.forEach((project) => {
      this.projectService
        .getReportsByProjectId(project.id)
        .subscribe((reports) => {
          project.simulations = reports;
        });
    });
  }

  // createProject(userId: string, projectName: string): void {
  //   this.projectService.addProject(userId, projectName).subscribe(response => {
  //     // 這裡可以處理成功創建項目的邏輯，例如重新加載項目列表
  //     this.loadProjects(userId);
  //   });
  // }

  openNewProjectDialog() {
    this.toggleCreateModal();
  }
  toggleCreateModal() {
    //也許要加上後端Insert之類的邏輯
    this.showCreateModal = !this.showCreateModal;
  }

  toggleProject(project: Project) {
    //司掌project向下展開與否
    project.expanded = !project.expanded;
  }

  editProject(project: Project) {
    //這裡之後要加上後端API傳projectId跳轉
    //還要更新Project的lastEditTime
    this.router.navigate(['/edit']);
  }

  deleteProject(project: Project) {
    this.toggleDeleteModal();
    //下面這一行目前會假裝直接砍掉這個project，以後要改成按yes的話執行相應的邏輯
    // this.projects = this.projects.filter(p => p !== project);
  }
  toggleDeleteModal() {
    this.showDeleteModal = !this.showDeleteModal;
  }
  onDelete(yesDelete: boolean, project: Project): boolean {
    if (yesDelete) {
      this.projects = this.projects.filter((p) => p !== project);
      return true;
    } else return false;
  }

  viewReport(simulation: Simulation) {
    this.router.navigate(['/report']);
  }
}
