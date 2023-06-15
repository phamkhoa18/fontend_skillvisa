export class Add_category {
  _id : String = '' ;
  title : String = '' ;
  parent_id : any = null ;
  background : any = '' ;

  constructor (_id : String , title : String , parent_id = null  , background : String) {
    this._id = _id ;
    this.title = title ;
    this.parent_id = parent_id ;
    this.background = background ;
  }
}
