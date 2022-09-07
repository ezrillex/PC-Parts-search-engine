from selenium import webdriver
import requests
#from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

datamine = [{"store": "E-STORE", "name": "TEST POST", "category": "TEST", "url": "https://youtube.com",
             "price": "$123.45", "pricecash": "$123.34", "pricediscount": "$199.99"}]

driver = webdriver.Firefox()

# gotta make this prettier and maybe have more info like category of link or some other needed data.
file = open("sources/kpc.txt")
data = file.readlines()
file.close()
print(data[0])

driver.get(data[0])
# driver.implicitly_wait(5)

products = driver.find_elements(By.CSS_SELECTOR, ".product-container")

#print("products: " , len(products))

for product in products:
    title = product.find_element(By.CSS_SELECTOR, ".product-name")
    name = title.text
    url = title.get_attribute('href')
    prices = product.find_elements(By.CSS_SELECTOR, ".price.product-price")
    card = prices[0].text
    cash = prices[1].text
    print(f"{name} Card: {card} Cash: {cash} Link: {url}")
    datamine.append({
        "store": "KPC HARDWARE",
        "name": name,
        "category": "GPU",
        "url": url,
        "price": card,
        "pricecash": cash,
        "pricediscount": ""
    })


file = open("sources/zd.txt")
del data
data = file.readlines()
file.close()

page = 0


def query():
    global page
    page += 1
    return f"?page={page}"


global results
results = True
while results is True:
    driver.get(data[0] + query())
    # driver.implicitly_wait(5)

    products = driver.find_elements(By.CSS_SELECTOR, ".product-card")

    if (len(products) <= 0):  # no more pages exit
        results = False
        break

    #print("products: " , len(products))

    for product in products:
        title = product.find_element(
            By.CSS_SELECTOR, ".product-card-title").find_element(By.TAG_NAME, "a")
        name = title.get_attribute('data-original-title')
        url = title.get_attribute('href')
        price = product.find_element(
            By.CSS_SELECTOR, ".quick-view-btn").get_attribute('data-price').strip()

        print(f"{name} Price: {price} Link: {url}")
        datamine.append({
            "store": "ZONA DIGITAL",
            "name": name,
            "category": "GPU",
            "url": url,
            "price": price,
            "pricecash": "",
            "pricediscount": ""
        })


driver.quit()

endpoint = "http://localhost:8000/update"

del data
for data in datamine:
    response = requests.post(endpoint, json = data)
    print(f"{response.status_code} {response.text}")
