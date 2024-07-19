import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';  // 导入 Project 类型
import { Simulation } from '../models/simulation.model';  // 导入 Simulation 类型


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  //這個資料以後會從後端取得
  projects: Project[] = [
    {
      name: 'project 1',
      date: '2024.07.11 04:57:00',
      expanded: false,
      simulations: [
        { name: '[Simulation] project 1', date: '2024.07.11 04:57:00' },
        // 添加更多模拟数据...
      ]
    },
    {
      name: 'project 2',
      date: '2024.07.11 04:57:00',
      expanded: false,
      simulations: [
        { name: '[Simulation] project 2', date: '2024.07.11 04:57:00' },
        // 添加更多模拟数据...
      ]
    },
    {
      name: 'project 3',
      date: '2024.07.11 04:57:00',
      expanded: false,
      simulations: [
        { name: '[Simulation] project 3', date: '2024.07.11 04:57:00' },
        // 添加更多模拟数据...
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openNewProjectDialog() {
    // 打开新项目对话框的逻辑
  }

  toggleProject(project: Project) {
    project.expanded = !project.expanded;
  }

  editProject(project: Project) {
    this.router.navigate(['/edit']);
  }

  deleteProject(project: Project) {
    this.projects = this.projects.filter(p => p !== project);
  }

  viewReport(simulation: Simulation) {
    this.router.navigate(['/report']);
  }

}
