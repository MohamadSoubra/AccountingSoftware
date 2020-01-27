export class loggedInUser {
    
    public token :string 
    public id :string
    public firstName :string
    public lastName :string
    public emailAddress :string
    public createdDate :Date

    public  LogOffUser()
    {
        this.token = "" ;
        this.id = "" ;
        this.firstName = "" ;
        this.lastName = "" ;
        this.emailAddress = "";
        this.createdDate = null ;
    }
     
}
