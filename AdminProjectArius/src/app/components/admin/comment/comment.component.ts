import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comment: Array<any> = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  searchedKeyword !: string;
  constructor(private commentService: CommentService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.getComment();
  }

  getComment(){
    this.commentService.getListComment().subscribe(data => {
      this.comment =data;
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getComment();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getComment();
  }

  deleteCmt(id:number){
    this.commentService.deleteComment(id).subscribe(data => {
      
    })
    this.notification.showSuccess("Delete comment successfull","Success");
    window.location.reload();
  }

  key: string= 'id'
  reserve: boolean= false;
  sort(key: string){
    this.key = key;
    this.reserve= !this.reserve 
  }
}
