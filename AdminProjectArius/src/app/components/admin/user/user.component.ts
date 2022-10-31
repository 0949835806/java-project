import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Array<any> = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  searchedKeyword !: string;
  constructor(private userService: UserService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }
  fetchPosts(): void{
    this.userService.getListUser().subscribe(response => {
      this.user = response;
    }
    )
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
  }
  onDelete(id:number){
    this.userService.onDelete(id).subscribe(data =>{
      this.userService.getListUser().subscribe(data => {
        this.user=data;
      })
    })
    this.notification.showSuccess("Delete user successfull","Success");
  }

  key: string= 'id'
  reserve: boolean= false;
  sort(key: string){
    this.key = key;
    this.reserve= !this.reserve 
  }
}
