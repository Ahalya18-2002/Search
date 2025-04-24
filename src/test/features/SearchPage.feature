Feature: User Authentication tests

Background:
Given User navigates to the Application

Scenario:Verify that the user can able to search the items 
When verify that the user is able to enter "bag" in the search box
Then Verify that the search icon is available on the search input field and is clickable 

Scenario:Verify that the search suggestions are displayed
When verify that the user is able to enter "bag" in the search box
Then verify the suggestions displayed

Scenario:Verify that the user can be redirected to the search result page when the user clicks the suggestion
When verify that the user is able to enter "bag" in the search box
Then rediracted to search result page

Scenario:Verify that the user searches for anything; the result should be displayed on the search result page
When verify that the user is able to enter "bag" in the search box 
Then rediracted to search result page 
Then verify that the search suggestion keyword displayed on the search result page
Then verify the search products displayed based on the search keyword
Then verify that the count of products displayed is based on the suggested product count

# Scenario:Verify the total number of products should be displayed on search result page 
# When verify that the user is able to enter "water" in the search box
# Then rediracted to search result page  
# Then the number of products displayed based on the count of products 

Scenario: Add a product to the cart from the search result page 
When verify that the user is able to enter "water" in the search box
Then Verify that the search icon is available on the search input field and is clickable 
When I clicks on the 'Add to Cart' button  
Then the products should be added to the cart successfully 

Scenario: Verify that the error message is displayed correctly 

When verify that the user is able to enter "ALG 717604" in the search box
Then rediracted to search result page
When the user click the Add to Cart button for an The product is out of stock, the error message "The product is out of stock." should be displayed
When the user click the Add to Cart button with a quantity greater than the available stock, the error message "The requested quantity is not available." should be displayed

Scenario:Verify that the "Your search returned no results" error message is displayed as expected
When the user searches using a combination of characters and numbers"123water"  
Then Verify that the search icon is available on the search input field and is clickable
Then verify that "Your search returned no results" error message is displayed   


Scenario:Verify that the search result shuld be displayed when the user Enter the more one inputs
When verify that the user searches the "water bag" with empty spaces, the search result should be displayed
Then Verify that the search icon is available on the search input field and is clickable
   
Scenario:Verify that the search box available on the home page header section is applicable for all the pages
When the user redirected to plp page, the search input was visible
When the user redirected to pdp page, the search input was visible
When the user redirected to search result page,the search input was visible "water"
When the user redirected to myaccount page,the search input was visible

Scenario:Verify that the user tried to search for the special characters; it didn't return any results, and it should display error messages
When verify that the user is able to enter "@#$" in the search box
Then Verify that the search icon is available on the search input field and is clickable
Then verify that "Your search returned no results" error message is displayed 

Scenario:Verify that the search results are displayed when the user enters a number,The results should be shown based on the user's input
When verify that the user is able to enter "1234" in the search box
Then Verify that the search icon is available on the search input field and is clickable
Then verify the search products displayed based on the search keyword 

Scenario:Verify that the product displayed the list view when the user clicks the list view option
When verify that the user is able to enter "water" in the search box
Then Verify that the search icon is available on the search input field and is clickable
When the user click the list view
Then verify the products are displayed list view

Scenario:Verify whether the user is able to view details of the product
When verify that the user is able to enter "water" in the search box
Then Verify that the search icon is available on the search input field and is clickable
Then verify the user rediracted to pdp page


Scenario:Verify the show items per page is working as expected
When verify that the user is able to enter "water" in the search box
Then Verify that the search icon is available on the search input field and is clickable
When the user change the perpage option
Then verify the products displayed based on the per page "option"   


# Scenario:Verify that the user can able to search by using the "tab" and "enter" key on the keyboard
# When verify that the user is able to enter "water" in the search box
# When the enterkey press on the keyboard and the user should be rediracted to search result page
# Then verify the search products displayed based on the search keyword 



