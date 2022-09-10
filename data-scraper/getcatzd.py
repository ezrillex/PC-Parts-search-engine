from selenium import webdriver
#from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

datamine = []

driver = webdriver.Firefox()
driver.implicitly_wait(5) # wait for it to be ready

driver.get("https://www.zonadigitalsv.com/")

numero = range(1,9)

for n in numero:
    data = driver.find_element(By.ID, f"cat_{n}")
    links = data.find_elements(By.TAG_NAME, "a")
    for link in links:
        url = link.get_attribute("href")
        if(url.find("#")>=0): 
            continue
        datamine.append(url + "\n")

driver.quit()

with open('sources/zd.txt', 'w', encoding='utf-8') as file:
    file.writelines(datamine)