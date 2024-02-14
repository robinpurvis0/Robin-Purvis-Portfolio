# Microservice for UNO card dealing
# Author: Sriram Narayanan

import random
import json

with open('../readme.txt','r') as f:
    lines = f.readlines()
uno_deck = []
players = int(lines[0].rstrip('\n'))
num_cards = int(lines[1].rstrip('\n'))
# num_cards = 7
# print(players,num_cards)
uno_deck_colors = ['Red','Yellow','Green','Blue']
uno_deck_types = [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,"Skip","Skip","Draw Two","Draw Two","Reverse","Reverse"]
uno_wild_cards = [(None,"Wild")]*4 + [(None,"Wild Draw Four")]*4
for color in uno_deck_colors:
    for type in uno_deck_types:
        card = (color,type)
        uno_deck.append(card)
uno_deck+=uno_wild_cards
# print(len(uno_deck))
random.shuffle(uno_deck)
dealing = {}
deck_pointer = 0
for i in range(players):
    dealing[i+1] = []
    for _ in range(num_cards):
        dealing[i+1].append(uno_deck[deck_pointer])
        deck_pointer+=1
dealing["rest"] = uno_deck[deck_pointer:]
output = json.dumps(dealing)
jsonWrite = open("../output.json","w")
jsonWrite.write(output)
jsonWrite.close()