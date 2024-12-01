const get30DaysBefore = () => {
    const now = new Date();
    now.setDate(now.getDate() - 30);
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); 
    const day = String(now.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };
  
  export default get30DaysBefore;