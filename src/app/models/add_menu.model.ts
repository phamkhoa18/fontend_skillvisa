export class Add_menu {
  _id : String = '' ;
  title : String = '' ;
  link : String = '' ;
  parent_id : any = null ;
  category_id : any = null;

  constructor (_id : String , title : String ,  link : String, parent_id = null , category_id : null) {
    this._id = _id ;
    this.title = title ;
    this.parent_id = parent_id ;
    this.link = link ;
    this.category_id = category_id ;
  }
}
