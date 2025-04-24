
import { expect, Page } from "@playwright/test";
import { HomePage } from "../Pages/HomePage";


class SearchPage {

    

    Searchbox = "(//input[@class='input-text'])[1]";
    Search_icon = "//button[@class='action search']";
    Search_suggestion = "//div[@class='search-autocomplete']//ul//li";
    search_suggestionproductcount ="//div[@class='search-autocomplete']//ul//li//span[@class='amount']";
    search_suggestionproductname = "//div[@class='search-autocomplete']//ul//li//span[@class='qs-option-name']";
    Search_keyword = "//div//h1//span";
    search_itemcountsuggestoin =  "(//p[@class='toolbar-amount']//span[3])[1]";



pagesoption = "(//ul[@class='items pages-items'])[2]//li[@class='item']";
Currentpage = "(//li[@class='item current'])[2]";
Products = "//div[@class='products wrapper grid products-grid']//ol//li";
Product_status = "//div[@class='stock unavailable']";

Addtocartbtnplp = "//div[@class='stock unavailable']//ancestor::div[@class='stock-details']//following-sibling::div[@class='product-item-inner']//div//div//button";
Error_message = "//span[@class='erp_out_of_stock_check_906']";
Available_Product_status = "//div[@class='stock available']";
Available_Qty = "//div[@class='stock available']//following-sibling::div//strong";
AddButton = "//div[@class='stock available']//ancestor::div[@class='stock-details']//following-sibling::div[@class='product-item-inner']//div//div//button";
Inputbox = "//div[@class='product-item-info']//div[@class='product-item-inner']//input[@class='qty']"; 
Requestedqty_Error = "//span[@class='erp_out_of_stock_check_9555']";

Nextbutton = "(//li[@class='item pages-item-next']//a[@class='action  next'])[2]";
Perpageoption = "(//select[@class='limiter-options'])[1]";
Selectperpageption = "(//select[@class='limiter-options']//option[3])[1]";
Product_name = "product-item-link";


NoresultfoundErrormsg = "//div[@class='message notice']//div";
ProductDisplayed = "//ol[@class='products list items product-items']//li";

listview = "(//a[@class='modes-mode mode-list'])[1]";
Clickperpageoption = "(//div[@class='control']//select[@class='limiter-options'])[1]";
itenPerpage_option = "(//div[@class='control']//select[@class='limiter-options']//option)[1]";
Items_count = "(//span[@class='toolbar-number'])[2]";
listview_Productcountfirstpage = "//div[@class='products wrapper list products-list']//ol[@class='products list items product-items']//li";

    page: Page;
    constructor(page: Page) {
        this.page = page;
      }
     
searchingtext = null;
productcount = null;

async Verify_Searchbox(){
    console.log("hiiiii");
    
    //  this.page.pause();
    await this.page.locator(this.Searchbox).isVisible();
    await this.page.click(this.Searchbox);
}   

async EnterSearchText(searchText){
    await this.page.fill(this.Searchbox, searchText);
    this.searchingtext = searchText;
    global.searchingtext = this.searchingtext;
    console.log("bbbbbbbb::::",global.searchingtext);
    

} 


async Verify_Searchicon(){
    await this.page.locator(this.Search_icon).isVisible();
    await this.page.click(this.Search_icon);
    await this.page.waitForLoadState('load', { timeout: 15000 });
}

async Verify_suggestions(){
    await this.page.locator(this.Search_suggestion).isVisible();
    console.log("Search_suggestion is visible");
    
}

async Verify_suggestionsrediraction(){
    const suggestions = this.page.locator(this.Search_suggestion);
   const suggestions_count =  await this.page.locator(this.Search_suggestion).count();
   console.log("suggestions_count::::",suggestions_count);

   for(var i = 0; i<=suggestions_count; i++ ){
   const Productcountofsuggestions = await this.page.waitForSelector(this.search_suggestionproductcount)
   const Search_productcount = Productcountofsuggestions.textContent();
   this.productcount =  Search_productcount;
   global.countofproducts = await this.productcount;
   console.log("global.countofproducts::::",global.countofproducts);
   
   await suggestions.nth(i).click();
   await this.page.waitForLoadState('load');
    console.log("suggestion is clicked.....");
    break;
    
   } 
}

async Verify_suggestionskeyword(){
  const Keyword = await this.page.locator(this.Search_keyword).textContent();
  console.log("keyword:::",Keyword);

  const match = Keyword.match(/'([^']+)'/);

if (match) {
    let extracted = match[1];
    console.log("keyword:::,",extracted); 

    console.log("this.searchingtext",global.searchingtext);
    console.log("extracted",extracted);

    if(global.searchingtext == extracted){

        console.log("the search keyword is matched");
        
    }else{
        console.log("the search keyword is not matched");
    }
}  
}
async Verify_itemcount(){
    await this.page.locator(this.search_itemcountsuggestoin).isVisible()
    const suggestion_productcount =  await this.page.locator(this.search_itemcountsuggestoin).textContent();
    
    console.log("suggestion_productcount",suggestion_productcount);
    console.log("global.countofproducts",global.countofproducts);
    
    if(global.countofproducts == suggestion_productcount){
        console.log("products count is matched");
        
    }else{
        console.log("products count is not matched");
    }
}


async Verify_suggestionskeywordintheproduct(){
    const keyword = global.searchingtext?.toLowerCase();
    if (!keyword) {
      console.error("The Search keyword is not set.");
      return;
    }
  
    try {
      await this.page.waitForSelector(this.Products, { timeout: 10000 });
    } catch {
      console.warn("Products not found on the first page.");
      return;
    }
  
    const products = this.page.locator("//ol//li//a[@class='product-item-link']");
    const count = await products.count();
  
    for (let i = 0; i < count; i++) {
      const name = (await products.nth(i).textContent())?.trim().toLowerCase();
  
      if (name?.includes(keyword)) {
        console.log(`The "${name}" matches the keyword.`);
      } else {
        console.warn(`The "${name}" doesn't match the keyword.`);
      }
    }
  
    console.log(" First page product verification complete.");
  }
  


async Get_Products_count() {
  try {
    let TotalUnavailableProducts = 0;
    let currentPage = 1;

    while (true) {
      // Wait for the products to load on the page

       // Wait for products to appear
       try {
        await this.page.waitForSelector(this.Products, { timeout: 15000 });
      } catch (e) {
        console.warn(`Products not found on page ${currentPage}. Skipping...`);
      }
      
      // select per page option..........
      // await this.page.locator(this.Perpageoption).isVisible();
      // await this.page.pause();
      // await this.page.locator(this.Perpageoption).click();
      // await this.page.locator(this.Selectperpageption).isVisible();
      // await this.page.locator(this.Selectperpageption).click();
      // console.log("clieddddddddd..........");
      
      await this.page.waitForLoadState('networkidle', { timeout: 15000 });

      // Count unavailable products on the current page
      const unavailableProducts = await this.page.locator(this.Products).count();
      console.log(`Page ${currentPage} - available Products count: ${unavailableProducts}`);

      TotalUnavailableProducts += unavailableProducts;

      // Check if the Next button is visible
      const nextButton = this.page.locator(this.Nextbutton);

      if (await nextButton.isVisible({ timeout: 5000 })) {
        await nextButton.click();
        currentPage++;
       await this.page.waitForLoadState('networkidle', { timeout: 15000 });
      } else {
        console.log("No more pages to navigate.");
        break;
      }
    }

    console.log(`Total available Products count Across All Pages: ${TotalUnavailableProducts}`);

  } catch (error) {
    console.error("Error in Get_Products_count:", error);
  }
}


async Verify_prductsbasedonkeyword() {
  const keyword = global.searchingtext?.toLowerCase();
  if (!keyword) {
    console.error("The Search keyword is not set.");
    return;
  }

  try {
    await this.page.waitForSelector(this.Products, { timeout: 10000 });
  } catch {
    console.log("Products not found on the first page.");
    return;
  }

  const products = this.page.locator(this.Product_name);
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const name = (await products.nth(i).textContent())?.trim().toLowerCase();

    if (name?.includes(keyword)) {
      console.log(`The roduct"${name}" matches the keyword.`);
    } else {
      console.log(`the product "${name}" doesn't match the keyword.`);
    }
  }

  console.log("First page product verification complete.");
}


async VerifyErrormsg_Noresults(s){
  await this.page.fill(this.Searchbox, s);
}

async CaptureErrormsg(s){
  const ResultfoundErrormsg ="Your search returned no results.".trim();

  await this.page.locator(this.NoresultfoundErrormsg).isVisible();
  const Errormsg = (await this.page.locator(this.NoresultfoundErrormsg).textContent()).trim();

  console.log("ResultfoundErrormsg====",ResultfoundErrormsg);
  console.log("Errormsg====",Errormsg);

const splitError = Errormsg.split('.')[0] + '.'; 
  expect(ResultfoundErrormsg).toEqual(splitError);

  if(ResultfoundErrormsg == Errormsg){
    console.log("The no results error message is displayed");
    
  }else{
    console.log("The no results error message is not displayed");
  }


}


async Verify_productsvisible(s){
  await this.page.waitForLoadState('load', { timeout: 15000 });
  const visibleProductCount = await this.page.locator(this.ProductDisplayed).count();
  console.log("Visible product count:", visibleProductCount);
 
  global.ProductCount = visibleProductCount;
  if (visibleProductCount > 0) {
    console.log("Products are displayed");
  } else {
    console.log("No products are displayed");
 }
   
}


async Verify_listview(){
  await this.page.locator(this.listview).isVisible();
  await this.page.locator(this.listview).click();
  await this.page.waitForLoadState("load");
  
}

async Verify_productlistview(){
    // First wait for the URL to change/match the expected
    await expect(this.page).toHaveURL(/.*list/);

    // Now get the updated URL after navigation
    const currentURL = this.page.url();
    console.log("currentURL:", currentURL);
  
    if (currentURL.includes('list')) {
      console.log("List view page URL is matched");
    } else {
      console.log(" List view page URL is not matched");
    }
}

async Change_perpageoption(){
  await this.page.pause();
  await this.page.locator(this.Clickperpageoption).isVisible();
  //  await this.page.locator(this.Clickperpageoption).click();
  await this.page.locator(this.itenPerpage_option).isVisible();
  // await this.page.locator(this.itenPerpage_option).click();
  // await this.page.waitForLoadState("load");
  const Selected_itemperpage = await this.page.locator(this.itenPerpage_option).textContent();
  // const itemperpage = await this.page.locator(this.itenPerpage_option).textContent();

  const itemCount = await this.page.locator(this.Items_count).textContent(); 

  global.Perpageoption = Selected_itemperpage;

  console.log("Selected_itemperpage::",Selected_itemperpage);
  console.log("global.Perpageoption::",global.Perpageoption);

  
  if(Selected_itemperpage == itemCount){
      console.log("perpage option is matched");
      
  }else{
    console.log("perpage option is not matched");
  }

}

// idhu mela iruka code oda inoru copy and then drp down clicks pani poradhu ana idhu work agala check pananum

// await this.page.pause();
// await this.page.locator(this.Clickperpageoption).isVisible();
// //  await this.page.locator(this.Clickperpageoption).click();
// // await this.page.locator(this.itenPerpage_option).isVisible();
// // await this.page.locator(this.itenPerpage_option).click();
// // await this.page.waitForLoadState("load");
// const Selected_itemperpage = await this.page.locator(this.Clickperpageoption).textContent();
// // const itemperpage = await this.page.locator(this.itenPerpage_option).textContent();

// const itemCount = await this.page.locator(this.Items_count).textContent(); 

// global.Perpageoption = Selected_itemperpage;

// console.log("Selected_itemperpage",Selected_itemperpage);
// console.log("itemCount",itemCount);

// if(Selected_itemperpage == itemCount){
//     console.log("perpage option is matched");
    
// }else{
//   console.log("perpage option is not matched");
// }


async Verify_firstpagecount(){
    console.log("global.Perpageoption:::",global.Perpageoption);
    console.log("global.ProductCount::",global.ProductCount);
    
    if(global.Perpageoption == global.ProductCount){
      console.log("The products displayed correctly based on the perpage option in list view");
    }else{
      console.log("The products not displayed correctly in the list view");

    }

    // this.listview_Productcountfirstpage  
    
}

async PressEnterButton_onkeyboard(){
  // await this.page.locator(this.Searchbox).press('ENTER');
  // console.log("Enter button is clickeed");
  // await this.page.waitForNavigation();

    const searchBoxLocator = this.page.locator(this.Searchbox);
    
    await searchBoxLocator.press('Tab');
    console.log("Tab key pressed");

    await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'load' }),
        searchBoxLocator.press('Enter')
    ]);
    
    console.log("Enter key pressed and redirected to search results page");


}

}

export { SearchPage };