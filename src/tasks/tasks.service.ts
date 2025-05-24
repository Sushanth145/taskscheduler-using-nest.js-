import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  createTask(title: string, description?: string): Task {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Task {
    const task = this.getTaskById(id);
    Object.assign(task, updates);
    return task;
  }

  deleteTask(id: string): void {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) throw new NotFoundException(`Task with ID ${id} not found`);
    this.tasks.splice(index, 1);
  }
}
