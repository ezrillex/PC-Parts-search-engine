import json
from selenium import webdriver
import requests
#from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# Price to float
def ptf(the_string):
    return float(the_string.replace("$", "").replace(',','').strip())

# initialization
datamine = []

with open("sources/kpc.txt") as file:
    store_data = file.readlines()

driver = webdriver.Firefox()
driver.implicitly_wait(5) # wait for it to be ready

#------------------------------------------------------------------------ STORE 1

# for page in store_data:
#     driver.get(page)
#     products = driver.find_elements(By.CSS_SELECTOR, ".product-container")

#     for product in products:
#         title = product.find_element(By.CSS_SELECTOR, ".product-name")
#         name = title.text
#         url = title.get_attribute('href')
#         prices = product.find_elements(By.CSS_SELECTOR, ".price.product-price")
        


#         if(len(prices) == 0): # no prices = not available
#             continue
        
#         card = prices[0].text
#         cash = prices[1].text
#         # print(f"{name} Card: {card} Cash: {cash} Link: {url}")
#         datamine.append({
#             "store": "KPC HARDWARE",
#             "name": name,
#             # "category": "GPU",
#             "url": url,
#             "price": card,
#             "pricefloat": ptf(card) ,
#             "pricecash": cash,
#             "pricecashfloat": ptf(cash)
#         })

# -------------------------------------------------------------------- STORE 2
with open("sources/zd.txt") as file:
    store_data = file.readlines()


def getProducts(link):
    global page
    global products
    page += 1
    driver.get(f"{link}?page={++page}")
    products = driver.find_elements(By.CSS_SELECTOR, ".product-card")
    return len(products)

for link in store_data:
    page = 0
    products = []
    # products = driver.find_elements(By.CSS_SELECTOR, ".product-card") # for intellisense
    
    # TODO OPTIMIZATION: GET PAGE NUMBER FROM FOOTER and do a simple for loop, this is crazy one extra get just to know this information
    while getProducts(link)  > 0: 
        for product in products:
            title = product.find_element(
                By.CSS_SELECTOR, ".product-card-title").find_element(By.TAG_NAME, "a")
            name = title.get_attribute('data-original-title')
            url = title.get_attribute('href')
            price_element = product.find_element(
                By.CSS_SELECTOR, ".product-card-body").find_element(By.CSS_SELECTOR, ".text-primary")
            
            discount = "0"
            if(price_element.text.count("$")>1):
                prices = price_element.text.split("$")
                price = "$" + prices[1]
                discount = "$" + prices[2]
            else:
                price = price_element.text


            print(f"{name} Price: {price} ")
            datamine.append({
                "store": "ZONA DIGITAL",
                "name": name,
                # "category": "GPU",
                "url": url,
                "price": price,
                "pricefloat": ptf(price),
                "pricediscount": discount,
                "pricediscountfloat": ptf(discount)
            })
        

driver.quit()

with open('datamine_backup.txt', 'w', encoding='utf-8') as file:
    json.dump(datamine, file, ensure_ascii=False, indent=4)

