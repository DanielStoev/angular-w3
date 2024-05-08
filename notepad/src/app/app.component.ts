import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'notepad';
  id: number = 0;
  editingIndex: number = -1;
  noteTitle: string = '';
  noteContent: string = '';

  notes: { title: string; content: string; noteId: number }[] = [];

  saveNote(title: string, content: string) {
    if (this.editingIndex !== -1) {
      if (title && content) {
        this.notes[this.editingIndex] = {
          title,
          content,
          noteId: this.notes[this.editingIndex].noteId,
        };
        this.resetForm();
      }
    } else {
      if (title && content) {
        this.notes.push({ title, content, noteId: this.id++ });
        this.resetForm();
      }
    }
  }

  editNote(index: number) {
    const note = this.notes[index];
    this.noteTitle = note.title;
    this.noteContent = note.content;
    this.editingIndex = index;
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }

  resetForm() {
    this.noteTitle = '';
    this.noteContent = '';
    this.editingIndex = -1;
  }
}