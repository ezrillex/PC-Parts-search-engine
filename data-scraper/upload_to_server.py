import requests
import json

kpc = []
zd = []

with open("datamine_backup_kpc.txt") as file:
    kpc = json.load(file)

with open("datamine_backup_zd.txt") as file:
    zd = json.load(file)

# print(kpc)
# print(type(kpc))
# print(kpc[0])
# print(type(kpc[0]))
# if(kpc[0]["pricediscount"] is None):
#     print("kpc test none true")
# else:
#     print("nope")

# exit()


data = kpc + zd

del kpc
del zd

endpoint = "http://localhost:8000/update"

for item in data:
    response = requests.post(endpoint, data=item)
    print(f"{response.status_code} {response.text}")

print("done.")