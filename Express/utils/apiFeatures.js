class API_Features{
  constructor(query, queryString) {
    this.Query = query  //it like this.Query==>Tour
    this.QueryString=queryString  //it like this.Query==>req.query
  }
  filter() {
     // ! Filtering
    const queryObj = { ...this.QueryString};
    const excludefields = ['page', 'sort', 'limit', 'fields']
    excludefields.forEach(el=>delete queryObj[el])
    // console.log(req.query,queryObj)
    console.log(this.QueryString)
    //! Advance flitering
    let queryStr = JSON.stringify(queryObj)
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
    //  console.log(JSON.parse(queryStr))
    this.Query=this.Query.find(JSON.parse(queryStr))
    // let Query = Tours.find(JSON.parse(queryStr))
    return this
  }

  sorting() {
     //! 2) Sorting
    if (this.QueryString.sort) {
      const sortBy = this.QueryString.sort.split(',').join(' ');
      console.log(sortBy)
      this.Query=this.Query.sort(sortBy)
    }
    else {
      this.Query=this.Query.sort('-createdAt')
    }
    return this
  }
  limiting() {
    //! 3)  Limiting fields
    if (this.QueryString.fields) {
      const fields = this.QueryString.fields.split(',').join(' ');
      this.Query = this.Query.select(fields);
      // console.log(fields)
    } else {
      this.Query=this.Query.select('-__v')
    }
    return this 
  }
  pagination() {
    //!  4)pagination
    const page = this.QueryString.page * 1 || 1
    const limit = this.QueryString.limit * 1 || 100
    const skip = (page - 1) * limit
    this.Query = this.Query.skip(skip).limit(limit);
    return this
  }
}
module.exports=API_Features