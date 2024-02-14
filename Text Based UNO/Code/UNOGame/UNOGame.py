import os
import sys
import random
import json

def clearConsole():
    os.system('cls' if os.name == 'nt' else 'clear')

def playReverse(playerOrder):
    if playerOrder == 1:
        playerOrder = -1
    elif playerOrder == -1:
        playerOrder = 1
    return playerOrder

def findNextPlayer(playerOrder, currentPlayer):
    global cardData
    if playerOrder == -1:
        nextPlayer = currentPlayer - 1
        if nextPlayer == 0:
            nextPlayer = len(cardData) - 1
    else:
        nextPlayer = currentPlayer + 1
        if nextPlayer > len(cardData)-1:
            nextPlayer = 1
    return nextPlayer

def playDrawTwo(cardData, playerOrder):
    global currentPlayer
    currentPlayer = findNextPlayer(playerOrder, currentPlayer)
    nextPlayer = findNextPlayer(playerOrder, currentPlayer)

    drawCard(cardData, currentPlayer)
    drawCard(cardData, currentPlayer)
    response = input("Dealing two cards to player " + str(currentPlayer) + " and skipping their turn. Type 'ready' when you're "
                                                                   "ready for player " + str(nextPlayer) + "'s turn")
    if response == "ready":
        return

def playDrawFour(cardData, playerOrder):
    global currentPlayer
    currentPlayer = findNextPlayer(playerOrder, currentPlayer)
    nextPlayer = findNextPlayer(playerOrder, currentPlayer)

    for i in range(4):
        drawCard(cardData, currentPlayer)

    playWild()
    response = input("Dealing four cards to player " + str(currentPlayer) + " and skipping their turn. Type 'ready' when you're "
                                                                   "ready for player " + str(nextPlayer) + "'s turn: ")
    if response == "ready":
        return

def playWild():
    global discardCard
    color = input("Enter the color you would like to change the discard color to: ")
    discardCard = [color, None]

def drawCard(cardData, playerNum):
    randCardIndex = random.randint(0, len(cardData['rest']) - 1)
    card = cardData['rest'][randCardIndex]
    cardData[str(playerNum)].append(card)
    cardData['rest'].pop(randCardIndex)

def checkIfInHand(playerHand, targetCard):
    for i in range(len(playerHand)):
        if len(targetCard[1]) > 1: #check for special cards
            if playerHand[i][1] == targetCard[1]:
                return i
        else: #check for int value cards
            if playerHand[i][0] == targetCard[0] and playerHand[i][1] == int(targetCard[1]):
                return i

    print("This card is not in your hand. Try playing a different card")
    playerChoice = input(
        "Enter the color and value of the card you want to play(or enter 'draw' to draw a card, and 'uno' if you have one card left): ")
    playerChoice = playerChoice.title()
    checkIfInHand(playerHand, playerChoice)


def checkValidPlay(topCard, playCard):
    checkIfInHand(playerHand, playCard)
    if topCard[0] != playCard[0] and topCard[1] != playCard[1]:
        print("The color or value doesn't match the top card. Try playing a different card")
        playerChoice = input(
            "Enter the color and value of the card you want to play(or enter 'draw' to draw a card, and 'uno' if you have one card left): ")
        playerChoice = playerChoice.split()
        checkValidPlay(topCard, playerChoice)


def printHand(playerHand):
    print("In your hand you have: ")
    for i in range(len(playerHand)):
        if playerHand[i][0] == None:
            print("None, " + str(playerHand[i][1]))
        else:
            print(playerHand[i][0] + ", " + str(playerHand[i][1]))

def generateDiscardCard(cardData):
    randCardIndex = random.randint(0, len(cardData['rest']) - 1)
    discardCard = cardData['rest'][randCardIndex]
    while isinstance(discardCard[1], str) or discardCard[0] == 'Wild' or discardCard[0] == 'Wild Draw Four':
        randCardIndex = random.randint(0, len(cardData['rest']) - 1)
        discardCard = cardData['rest'][randCardIndex]
    del cardData['rest'][randCardIndex]
    return discardCard

def getPlayerNum():
    numPlayers = int(input("Enter the number of players(Min: 2, Max: 7): "))
    numPlayers = int(numPlayers)

    if numPlayers < 2 or numPlayers > 7:
        print("Invalid player number. Try again")
        getPlayerNum()
    return numPlayers

def getCardNum(numPlayers):
    maxCards = 15 #Check that input is in bounds
    if numPlayers > 3:
        maxCards = 10
    elif numPlayers >= 5:
        maxCards = 8

    numCards = input("Enter the number of cards per player(Min: 7, Max: " + str(maxCards) + "): ") #Get numcards input
    numCards = int(numCards)

    if numCards > maxCards or numCards < 7: #Check if input is in bounds
        print("Invalid card amount, try again")
        getCardNum(numPlayers)
    return numCards

def printDiscardCard(discardCard):
    message = "The card on top of the pile is a "
    play = "You must play a "
    if discardCard[0] != None:
        message += discardCard[0] + " "
        play += discardCard[0] + " card "
    if discardCard[1] != None:
        message += str(discardCard[1])
        play += "or a " + str(discardCard[1])
    print(message)
    print(play)

def cardChoice(discardCard):
    printHand(cardData[str(currentPlayer)])
    printDiscardCard(discardCard)
    playerChoice = input(
        "Enter the color and value of the card you want to play(or enter 'draw' to draw a card, and 'uno' if you have one card left): ")
    playerChoice = playerChoice.title()
    playerChoice = playerChoice.split()
    if len(playerChoice) > 2:
        playerChoiceColor = playerChoice[0]
        if playerChoiceColor == 'None':
            playerChoiceColor == None
        playerChoice.pop(0)
        playerPick = ' '.join(playerChoice)
        playerChoice = [playerChoiceColor, playerPick]
    return playerChoice

def rwFile():
    global cardData
    with open('../readme.txt', 'w') as inputFile:  # Write input to file
        inputFile.write(str(numPlayers) + "\n")
        inputFile.write(str(numCards))
    inputFile.close()

    os.system("python ../UNOService/UNOService.py")  # Run service and read the data
    with open('../output.json', 'r') as cardFile:
        cardData = json.loads(cardFile.read())
    cardFile.close()

numPlayers = getPlayerNum() #get input
numCards = getCardNum(numPlayers)

cardData = {}
rwFile()

discardCard = generateDiscardCard(cardData)
currentPlayerHandLength = len(cardData['1'])-1
currentPlayer = 1
noUno = True
playerOrder = 1 # 1 is forward, -1 is backward

while noUno:
    for i in range(numPlayers):
        playerHand = cardData[str(currentPlayer)]
        clearConsole()

        response = input(
            "Player " + str(currentPlayer) + "'s turn. Type 'ready' when you're ready. Type 'back' to start a different "
                                             "game. Type 'exit' to close the game: ") #Ask player for confirmation
        response = response.lower()

        if response != "ready" and response != "back" and response != "exit": #check for bad input
            while response != "ready" and response != "back" and response != "exit":
                print("Invalid input. Try again.")
                response = input(
                    "Player " + str(currentPlayer) + "'s turn. Type 'ready' when you're ready. Type 'back' to "
                                                     "start a different game. Type 'exit' to close the game: ")
                response = response.lower()

        if response == "exit":
            sys.exit()

        elif response == "back":
            numPlayers = getPlayerNum()  # get input
            numCards = getCardNum(numPlayers)
            rwFile()
            currentPlayer = 1
            continue

        elif response == "ready": #If player is ready, their turn starts
            playerChoice = cardChoice(discardCard)

            if playerChoice[0] == 'Draw': #draw card
                confirm = input(
                    "Are you sure you want to draw a card? Enter 'yes' to confirm and 'no' to pick a card to play: ")
                confirm = confirm.title()
                if confirm == 'Yes':
                    drawCard(cardData, currentPlayer)
                    currentPlayer = findNextPlayer(playerOrder, currentPlayer)
                    continue
                else:
                    playerChoice = cardChoice(discardCard)

            if playerChoice[0] != 'Uno' and len(cardData[str(currentPlayer)]) == 1: #check for UNO
                print("You didn't say uno and you only have one card left. Game over")
                # keep playing w/ other players
                sys.exit()
            elif playerChoice[0] == 'Uno' and len(cardData[str(currentPlayer)]) == 1: #check for valid UNO
                finishgame = input("You won! Enter 'done' to end the game.")
                if finishgame == 'done':
                    noUno = False
                    sys.exit()
            elif playerChoice[0] == 'Uno' and len(cardData[str(currentPlayer)]) != 1: #check for invalid UNO
                print("You don't have an UNO. Choose a card:")
                playerChoice = cardChoice(discardCard)

            playerHand = cardData[str(currentPlayer)]
            checkIfInHand(playerHand, playerChoice)

            playerResponse = input("Are you sure you want to play your " + playerChoice[0] + " " + str(
                playerChoice[1]) + "? Enter 'yes' to play your card or 'no' to choose a different card: ")

            if playerResponse.lower() == 'yes':
                cardData[str('rest')].append(discardCard) #add current discard card to deck of cards
                discardCard = playerChoice
                cardLoc = checkIfInHand(playerHand, discardCard)

                del cardData[str(currentPlayer)][cardLoc]

                if discardCard[1] == "Draw Two":
                    playDrawTwo(cardData, playerOrder)
                elif discardCard[1] == "Skip":
                    currentPlayer = findNextPlayer(playerOrder, currentPlayer)

                elif discardCard[1] == "Wild":
                    playWild()
                elif discardCard[1] == "Wild Draw Four":
                    playDrawFour(cardData, playerOrder)
                elif discardCard[1] == "Reverse":
                    playerOrder = playReverse(playerOrder)
            elif playerResponse.lower() == 'no':
                playerChoice = cardChoice(discardCard)
                checkValidPlay(discardCard, playerChoice)

        currentPlayer = findNextPlayer(playerOrder, currentPlayer)

sys.exit()