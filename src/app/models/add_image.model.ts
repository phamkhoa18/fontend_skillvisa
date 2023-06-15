export class Add_image {
  _id : string = '' ;
  title : string = '' ;
  description : string = '' ;
  link : any = '' ;
  url : any = '' ;
  file : File | null = null;

  constructor (_id : string , title : string , description : string , link : String , url : String , file : any ) {
    this._id = _id ;
    this.title = title ;
    this.description = description ;
    this.link = link ;
    this.url = url ;
    this.file = file ;
  }
}
