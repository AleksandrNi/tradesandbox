export function  getPageFrom(params, getPageFromComputed) {
    const pageFrom = this.$router.params.pageFrom
    console.log(pageFrom);
    console.log(params);
    for (let arg of params) {
      if(arg === pageFrom) {return arg}
    }
    return false
  }
