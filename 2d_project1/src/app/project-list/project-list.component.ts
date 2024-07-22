import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  showCreateModal = false;
  showDeleteModal = false;
  ngOnInit(): void {
  }

  openNewProjectDialog() {
    this.toggleCreateModal();
  }
  toggleCreateModal() {
    this.showCreateModal = !this.showCreateModal;
  }
  toggleDeleteModal() {
    this.showDeleteModal = !this.showDeleteModal;
  }

  toggleProject(project: Project) {
    project.expanded = !project.expanded;
  }

  editProject(project: Project) {
    this.router.navigate(['/edit']);
  }

  deleteProject(project: Project) {
    this.toggleDeleteModal();
    //下面這一行目前會假裝直接砍掉這個project，以後要改成按yes的話執行相應的邏輯
    // this.projects = this.projects.filter(p => p !== project);
  }
  onDelete(yesDelete:boolean, project:Project):boolean{
    if(yesDelete){
      this.projects = this.projects.filter(p => p !== project);
      return true;
    }else return false;
  }

  viewReport(simulation: Simulation) {
    this.router.navigate(['/report']);
  }

}
