import { Component,OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../auth.service";
import { User } from "src/app/models/User.model";
import { TableComponent } from "src/app/sharedFeatures/table/table.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-user-manager',
    templateUrl: './UsersManager.component.html',
    styleUrls: ['./UsersManager.component.scss']
})

export class UsersManagerComponent<T> implements OnInit {
    usersList: User[]
    usersTableColumns = [];
    componentName: string = "User";
    selectedUsers;

    @ViewChild(TableComponent) table: TableComponent<User>;
    constructor(
        private auth: AuthService<T>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    )
        {}


    ngOnInit(){

        this.auth.getUsers().subscribe(users => this.usersList = users as User[])

        this.usersTableColumns = [
            {
                name: "User Name",
                dataKey: "userName",
                isSortable: true,
                isFilterable: true,
            },
            {
                name: "First Name",
                dataKey: "firstName",
                isSortable: true,
                isFilterable: true,
            },
            {
                name: "Last Name",
                dataKey: "lastName",
                isSortable: true,
                isFilterable: true,
            },
            {
                name: "Email",
                dataKey: "emailAddress",
                isSortable: true,
                isFilterable: true,
            },
        ]

    }

    edit(user){
        console.log("user",user);
    }
    
    delete(user){
        console.log("user",user);
    }

    AddRecord(){
        this.router.navigate(["./", 0], {
            relativeTo: this.activatedRoute,
          });
    }
    
    batchDelete(){
        this.selectedUsers = this.table.selection.selected
        console.log(this.selectedUsers);
        console.log("Not implemented");
    }
}