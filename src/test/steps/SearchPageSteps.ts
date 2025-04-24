import { Given, Then, When } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import { HomePage } from "../Pages/HomePage";
import { SearchPage } from "../Pages/SearchPage";
import { pageFixture } from "../hooks/pageFixture";
import { ProductListingPage } from "../Pages/ProductListingPage";
import {ProductDetailsPage } from "../Pages/ProductDetailPage";
import { LoginPage } from "../Pages/LoginPage";

let homePage: HomePage;
let search: SearchPage;
let loginPage: LoginPage;
let plp:ProductListingPage;
let Pdp:ProductDetailsPage;
let page: Page;

When ("verify that the user is able to enter {string} in the search box",async function (this: { page: Page },searchText: string){
    console.log("hi");
    page = this.page;
    search = new SearchPage(page);
    await search.Verify_Searchbox();

    await search.EnterSearchText(searchText);
    console.log("vanakammmmdddd");
    
});

Then ("Verify that the search icon is available on the search input field and is clickable",async function (this: { page: Page }) {
    page = this.page;
    search = new SearchPage(page);
    await search.Verify_Searchicon();
});

Then("verify the suggestions displayed",async function (this: { page: Page }){
    page = this.page;
    search = new SearchPage(page);
    await search.Verify_suggestions();
});

Then ("rediracted to search result page",async function (this: { page: Page }){
    page = this.page;
    search = new SearchPage(page);
    await search.Verify_suggestionsrediraction();
});

Then ("verify that the search suggestion keyword displayed on the search result page",async function (this: { page: Page }){
    page = this.page;
    search = new SearchPage(page);
    await search.Verify_suggestionskeyword();
});

Then ("verify the search products displayed based on the search keyword",async function (this: { page: Page }){
    page = this.page;
    search = new SearchPage(page);
    await search.Verify_suggestionskeywordintheproduct();
});
Then ("verify that the count of products displayed is based on the suggested product count",async function (this: { page: Page }){
    page = this.page;
    search = new SearchPage(page);
    await search.Verify_itemcount();
});

Then ("the number of products displayed based on the count of products",async function (this: { page: Page }){
     page = this.page;
    search = new SearchPage(page);
    await search.Get_Products_count()

}); 

When("I clicks on the {string} button", async (Add_to_cart: string) => {
     const plp = new ProductListingPage(pageFixture.page);
     await plp.Add_to_cart();
});

Then("the products should be added to the cart successfully", async () => {
    const plp = new ProductListingPage(pageFixture.page);
    await plp.Add_to_cart_confirmationMessage();
});

When ("the user click the Add to Cart button for an The product is out of stock, the error message {string} should be displayed",async (s: string)=>{
    console.log("bbbbbbbbbb");
    const plp = new ProductListingPage(pageFixture.page);
    // await plp.GetTotaloutofstockproducts()
    await plp.Get_Products_status(); 
    
});
When ("the user click the Add to Cart button with a quantity greater than the available stock, the error message {string} should be displayed",async (s: string)=>{
  console.log("fffffff");
  const plp = new ProductListingPage(pageFixture.page);
  await plp.MoreProductErrormsg()
  
});

When ("the user searches using a combination of characters and numbers{string}",async function (this: { page: Page },s: string){
    page = this.page;
    search = new SearchPage(page);
    await search.VerifyErrormsg_Noresults(s);

});

Then ("verify that {string} error message is displayed",async function (this: { page: Page },s: string){
    page = this.page;
    search = new SearchPage(page);
    await search.CaptureErrormsg(s);
});


When ("verify that the user searches the {string} with empty spaces, the search result should be displayed",async function (this: { page: Page },searchText: string){
    page = this.page;
    search = new SearchPage(page);
    await search.EnterSearchText(searchText);
    await search.Verify_productsvisible(searchText);
});

// When ("the user redirected to plp page, the search input was visible",async function (this: { page: Page }){
//     const plp = new ProductListingPage(pageFixture.page);
//     await plp.click_ShopByCategory();
//     await plp.select_Category1();
//     await plp.select_Category2();
//     await plp.Select_Category3_navigateTOPLP();

//     search = new SearchPage(page);
//     await search.Verify_Searchbox();
//     // await search.EnterSearchText(searchText);  
// });

When("the user redirected to plp page, the search input was visible", async function () {
        const plp = new ProductListingPage(pageFixture.page);
        await plp.click_ShopByCategory();
        await plp.select_Category1();
        await plp.select_Category2();
        await plp.Select_Category3_navigateTOPLP();
    
        const search = new SearchPage(pageFixture.page);
        await search.Verify_Searchbox();
    });
    
    When("the user redirected to pdp page, the search input was visible", async function () {
        const plp = new ProductListingPage(pageFixture.page);
        const pdp = new ProductDetailsPage(pageFixture.page);
    
        await plp.click_ShopByCategory();
        await plp.select_Category1();
        await plp.select_Category2();
        await plp.Select_Category3_navigateTOPLP();
    
        await pdp.ClicksProductName();
    
        const search = new SearchPage(pageFixture.page);
        await search.Verify_Searchbox();
    });
    
    When("the user redirected to search result page,the search input was visible {string}", async function (this: { page: Page },searchText: string) {
        const search = new SearchPage(pageFixture.page);
        await search.Verify_Searchbox();
        await search.EnterSearchText(searchText);
        await search.Verify_Searchicon();
      
        await search.Verify_Searchbox();  // again check the input is visible......
    });
    
    When("the user redirected to myaccount page,the search input was visible", async function () {
        const loginPage = new LoginPage(pageFixture.page);
    
        await loginPage.navigatetoSignIn();
        await loginPage.enterUserName("checkout0001@gmail.com");
        await loginPage.enterPassword("Dckap@123")
        await loginPage.click_SignIn();
    
        const search = new SearchPage(pageFixture.page);
        await search.Verify_Searchbox();
        // await search.Verify_Searchicon();
    });
    
    When ("the user click the list view",async function (){
        page = this.page;
        search = new SearchPage(page);
        await search.Verify_listview()
    });
    Then ("verify the products are displayed list view",async function (){
        page = this.page;
        search = new SearchPage(page);
        await search.Verify_productlistview();

    });


    Then ("verify the user rediracted to pdp page",async function (){
        const pdp = new ProductDetailsPage(pageFixture.page);
        await pdp.ClicksProductName();
        await pdp.VerifyPage();
    });
    
    When ("the user change the perpage option",async function (){
        page = this.page;
        search = new SearchPage(page);
        await search.Change_perpageoption();
    });
    Then("verify the products displayed based on the per page {string}", async function (this: { page: Page }, s: string) {
         page = this.page;
        const search = new SearchPage(page);
        await search.Verify_productsvisible(s);
        await search.Verify_firstpagecount(); 
       
        
    });

    When ("the enterkey press on the keyboard and the user should be rediracted to search result page", async function (this: { page: Page }) {
        page = this.page;
        const search = new SearchPage(page);
        await search.PressEnterButton_onkeyboard();
    })
       