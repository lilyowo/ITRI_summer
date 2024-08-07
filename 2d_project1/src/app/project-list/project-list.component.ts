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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {}
  showCreateModal = false;
  showDeleteModal = false;
  userId!: number;
  selectedProjectId: number = -1;
  selectedProjectName: string = '';
  searchQuery: string = '';

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

  searchProjects(): void {
    this.projectService
      .searchProjects(this.userId, this.searchQuery)
      .subscribe((projects) => {
        if (projects.length === 0) {
          this.projects = [];
          alert(`No project named "${this.searchQuery}"`);
          this.loadProjects(this.userId);
        } else {
          this.projects = projects;
          this.loadReportsForProjects();
        }
      });
  }

  toggleCreateModal() {
    this.showCreateModal = !this.showCreateModal;
    (async () => {
      //wait a secont then reload
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.loadProjects(this.userId);
    })();
  }

  toggleProject(project: Project) {
    //司掌project向下展開與否
    project.expanded = !project.expanded;
  }

  editProject(project: Project) {
    //這裡之後要加上後端API傳projectId跳轉
    this.selectedProjectId = project.id;
    this.selectedProjectName = project.name;
    //還要更新Project的lastEditTime
    this.router.navigate(['/edit'], {
      queryParams: { projectId: this.selectedProjectId },
    });
  }

  deleteProject(project: Project) {
    this.selectedProjectId = project.id;
    this.selectedProjectName = project.name;
    this.toggleDeleteModal();
    this.loadProjects(this.userId);
    //下面這一行會假裝在前端砍掉這個project
    // this.projects = this.projects.filter(p => p !== project);
  }
  toggleDeleteModal() {
    this.showDeleteModal = !this.showDeleteModal;
    (async () => {
      //wait a secont then reload
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.loadProjects(this.userId);
    })();
  }

  viewReport(simulation: Simulation) {
    this.router.navigate(['/report'], {
      queryParams: { reportId: simulation.id },
    });
  }
}
