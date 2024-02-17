export class Apifeatures {
  constructor(mongoosequery, searchquery) {
    this.mongoosequery = mongoosequery;
    this.searchquery = searchquery;
  }
  pagination() {
    if (this.searchquery.page <= 0) this.searchquery.page = 1;
    let pageNumber = this.searchquery.page * 1 || 1;
    let pageLimit = 8;
    let skip = (pageNumber - 1) * pageLimit;
    this.mongoosequery.skip(skip).limit(pageLimit);
    return this;
  }
  filter() {
    let filterobj = { ...this.searchquery };
    let execluded = ["page", "sort", "fields", "keyword"];
    execluded.forEach((val) => {
      delete filterobj[val];
    });
    filterobj = JSON.stringify(filterobj);
    filterobj = filterobj.replace(/(gt|gte|lt|lte)/g, (match) => "$" + match);
    filterobj = JSON.parse(filterobj);
    this.mongoosequery.find(filterobj);
    return this;
  }
  sort() {
    if (this.searchquery.sort) {
      let sortby = this.searchquery.sort.split(",").join(" ");
      this.mongoosequery.sort(sortby);
    }
    return this;
  }
  fields() {
    if (this.searchquery.fields) {
      let fields = this.searchquery.fields.split(",").join(" ");
      this.mongoosequery.select(fields);
    }
    return this;
  }
  search() {
    if (this.searchquery.keyword) {
      mongooseQuery.find({
        $or: [
          { title: { $regex: this.searchquery.keyword } },
          { description: { $regex: this.searchquery.keyword } },
        ],
      });
    }
    return this;
  }
}
