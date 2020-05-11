/*
 *** This is main class object to play the game.
 */
class TicTakToe {
    constructor() {
        this.singlePlayer = 1;
        this.doublePlayer = 0;
        

        this.match_tie = 0;

        this.total_match = 1;

        this.win_pattern = ['1,5,9', '1,2,3', '1,4,7', '2,5,8', '3,5,7', '3,6,9', '4,5,6', '7,8,9'];


    }

}
/*
 *** This class for player 1 
 */
class PlayerOne{
    constructor() {
        this.text = 'X';
        this.win = 0;
        this.slotNumbers = [];
    }
}
/*
 *** This class for player 2 it could be computer as well 
 */
class PlayerTwo{
    constructor() {
        this.text = 'O';
        this.win = 0;
        this.slotNumbers = [];
    }
}
/*
 *** This class handle the game flow
 */
class Move{
    constructor() {
        this.count_slot = 1;
        //0=blank, 1=player1 , 2=player2, 3=computer
        this.startPlayer = 1;
        this.current_player = 1;
    }
}
/*
 *** This class helper class to handle other object like label media like audio etc.
 */
class OtherHelper{
    constructor() {
        this.mute = 0;
        this.reset = 0;
        this.activeButtonBgColor = '#DCFBDC';
        this.deactiveButtonBgColor = '#EB532D';

        this.person_text = '1p';
    }
}
/*
 *** This const variable for audio handle on or off
 */
const song = document.getElementById("myAudio");

/*
 *** Initial all class object;
 */

let ticTakToe = new TicTakToe();
let player1 = new PlayerOne();
let player2 = new PlayerTwo();
let move = new Move();
let othersHelper = new OtherHelper();

/*
 *** Browser Autoplay Policy Changes fixes.
 */
autoPlayAudio();


function autoPlayAudio(){
    if(sessionStorage.getItem("autoPlay")!=1){
        sessionStorage.setItem("autoPlay", 1);
        location.reload();
    }else{
        sessionStorage.clear();
    }
    
}



function resetPlayerAttribute(player,computerLabel,playerLabel){
    resetNewPlayerMode();
    
    
   
    ticTakToe.singlePlayer = player == 1 ? 1 : 0;
    ticTakToe.doublePlayer = player == 0 ? 1 : 0;
    
    //changing button background and text color, changing person text and player2 text
    changePersonPlayer2Text(computerLabel, playerLabel);
    changeButtonColor();
}


/*
 *** This function set for single player mode. One player can play with computer.
 */
function selectSinglePlayer() {
    
    resetPlayerAttribute(1,'Computer(O)', '1P');

}
/*
 *** This function set for two player mode. One player can play other player.
 */
function selectTwoPlayer() {  

    resetPlayerAttribute(0,'Player 2(O)', '2P');
}

/*
 *** This function run the game when select any slot and udating and runing the game
 */
function selectSlot(btn) {
    if (move.count_slot <= 10) {

        if (ticTakToe.singlePlayer == 1) {

            if ($('.slot_' + btn).text() == '') {
                setSlotText(btn);
                result = calculateGamePattern();
                if (result['player1Win'] == 1) {
                    updateWinGame(1);
                } else if (result['player2Win'] == 1) {
                    updateWinGame(2);
                } else if (move.count_slot == 10) {
                    updateTieGame(ticTakToe.startPlayer);

                } else {
                    setResult();
                }
            }


        } else if (ticTakToe.doublePlayer == 1) {

            if ($('.slot_' + btn).text() == '') {
                setSlotText(btn);
                result = calculateGamePattern();
                if (result['player1Win'] == 1) {
                    $('.slot').attr('disabled', 'disabled');
                     updateWinGame(1);
                } else if (result['player2Win'] == 1) {
                    $('.slot').attr('disabled', 'disabled');
                     updateWinGame(2);
                } else if (move.count_slot == 10) {
                    $('.slot').attr('disabled', 'disabled');
                     updateTieGame(4);
                }
            }

        }
    } else {
        $(".win_popup").click();
    }

}

/*
 *** This function set complete reset the game. All data will wiped out in browser.
 */
function reset() {
    location.reload();
}
/*
 *** This function set reset for switch one player mode to two player or two player mode. All data will wiped out in browser.
 */
function resetNewPlayerMode() {
    initialAllSlot();
    initialResult();
    initialNewPlayers();
    initialMove();
    updateResultText();

}

 

/*
 *** This function set reset for switch one player mode to two player or two player mode. All data will wiped out in browser.
 */
function resetForNewMatch() {
    initialAllSlot();
    initialPlayer();
    player1.slotNumbers=[];
    player2.slotNumbers=[];
    move.count_slot=1
    if (ticTakToe.singlePlayer == 1 && ticTakToe.total_match % 2 == 0) {
        setResult();
    }

    updateResultText();
}
/*
 *** This function for sound off or pause the background audio music.
 */
function muteSound() {
    togglePlayPause();
    if (othersHelper.mute == 0) {
        othersHelper.mute = 1
    } else {
        othersHelper.mute = 0;
    }

    changeButtonColor();
}
/*
 *** This function close any popup box in this window.
 */
function closePopup() {

    resetForNewMatch();
    changeButtonColor();
    // 
    $('body').removeAttr('onclick');
    updateResultText();
    $('.slot').removeAttr('disabled');

}



/*
 *** This function update game result show in result section
 */
function updateResultText() {
    //console.log('yes');   
    $('.player1_win').text(player1.win);
    $('.player2_win').text(player2.win);
    $('.match_tie').text(ticTakToe.match_tie);
}
/*
 *** This function to create random number and return it when player mode is single.
 */
function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}
/*
 *** This function to create random number and return it when player mode is single.
 */
function updateWinGame(player) {
    ticTakToe.total_match = ticTakToe.total_match + 1;
    //ticTakToe = updateResultText(ticTakToe);
    if (player == 1) {
        player1.win = player1.win + 1;
        successGamePopup(1);
    }
    if (player == 2 && ticTakToe.singlePlayer == 1) {
        player2.win = player2.win + 1;
        loseGamePopup();
    }
    if (player == 2 && ticTakToe.doublePlayer == 1) {
        player2.win = player2.win + 1;
        successGamePopup(2);
    }
    
}

function updateTieGame(player) {

    if (player == 3) {
        setResult();

    } else {
        ticTakToe.match_tie = ticTakToe.match_tie + 1;
        ticTakToe.total_match = ticTakToe.total_match + 1;
        //ticTakToe=updateResultText(ticTakToe);
        tieGamePopup();
    }
    
}



/*
 *** This function mainly check the game pattern when play the sigle mode game and select slot for  each face and given result an array for next getRanddom number.
 */
function calculateGamePattern() {
    //this is local variable for player1 win check. if it is 1 means player1 win
    let player1Win = 0;

    //this is local variable for player2 win check. if it is 1 means player2 win
    let player2Win = 0;

    //this is local variable when player mode single player and what is next slot should be as a computer after checking player1 win pattern.
    let computer_number1 = 0;

    //this is local variable when player mode single player and what is next slot should be as a computer after checking computer win pattern.
    let computer_number2 = 0;

    //this loop for checking win pattern for both and outcome possible number or win player
    for (let i = 0; i < ticTakToe.win_pattern.length; i++) {
        //winner pattern string to array convert
        pattern = ticTakToe.win_pattern[i];
        pattern_array = pattern.split(',');

        //how many times player1 equal to win pattern
        count_pattern_player1 = 0;

        //how many times player2 or conputer equal to win pattern
        count_pattern_player2 = 0;

        //checking winner pattern in both two player
        for (let j in pattern_array) {

            for (let k in player1.slotNumbers) {
                if (player1.slotNumbers[k] == pattern_array[j]) {
                    count_pattern_player1 = count_pattern_player1 + 1;
                }
            }
            for (let l in player2.slotNumbers) {
                if (player2.slotNumbers[l] == pattern_array[j]) {
                    count_pattern_player2 = count_pattern_player2 + 1;
                }
            }

        }
        // count_pattern_player1 equal to 3 means player1 win
        if (count_pattern_player1 == 3) {console.log('1');
            player1Win = player1Win + 1;
        }

        // count_pattern_player2 equal to 3 means player2 or computer win
        if (count_pattern_player2 == 3) {console.log('2');
            player2Win = player2Win + 1;
        }

        // count_pattern_player1 equal to 2 means what next computer number should be if player1 win pattern equal 2 out of 3
        if (count_pattern_player1 == 2) {
            for (let j in pattern_array) {
                check1 = player1.slotNumbers.find(function(number) {
                    return number == pattern_array[j];
                });
                check2 = player2.slotNumbers.find(function(number) {
                    return number == pattern_array[j];
                });
                if (check1 == undefined && check2 == undefined) {
                    computer_number1 = pattern_array[j];
                }
            }

        }

        // count_pattern_player2 equal to 2 means what next computer number should be if player2 or computer win pattern equal 2 out of 3
        if (count_pattern_player2 == 2) {
            for (let j in pattern_array) {
                check1 = player1.slotNumbers.find(function(number) {
                    return number == pattern_array[j];
                });
                check2 = player2.slotNumbers.find(function(number) {
                    return number == pattern_array[j];
                });
                if (check1 == undefined && check2 == undefined) {
                    computer_number2 = pattern_array[j];
                }


            }

        }

    };

    //return all possible value
    
    return {
        player1Win: player1Win,
        player2Win: player2Win,
        computer_number1: computer_number1,
        computer_number2: computer_number2
    };


}
/*
 *** This function for popup model content change and class control
 */
function popupAction(addClass, text) {
    setTimeout(function() {
        $(".win_popup").click();
        $(".result_message").removeClass('text-danger').removeClass('text-warning').removeClass('text-success');
        $(".result_message").addClass(addClass);
        $(".result_message").text(text);
        $('body').attr('onclick', 'closePopup()');
    }, 500);
}

/*
 *** This function for player 1 or player 2 win the game popup message. 
 */
function successGamePopup(player) {
    popupAction('text-success', 'Player ' + player + ' Win !!!');
}
/*
 *** This function when play mode single player and computer will win the mena you lose the game popup message.
 */
function loseGamePopup() {
    popupAction('text-danger', 'You Lose the game !!!');

}
/*
 *** This function for any game when tie the game popup message.
 */
function tieGamePopup() {
    popupAction('text-warning', 'Match Tie !!!');
}


/*
 *** This function mainly initial player mode mean every game should be two way flow. If one player play first, second player should play first for next game.
 */
function initialPlayer() {
    if (ticTakToe.singlePlayer == 1) {
        move.startPlayer = ticTakToe.total_match % 2 == 0 ? 3 : 1;
    } else if (ticTakToe.doublePlayer == 1) {
        move.startPlayer = ticTakToe.total_match % 2 == 0 ? 2 : 1;        
    }    
}
/*
 *** This function for initial all slot text and value.
 */

function initialAllSlot() {
    for (let i = 1; i < 10; i++) {
        $('.slot_' + i).text('');
    };
   
}

/*
 *** This function for initial Move function
 */

function initialMove() {
    move = new Move();
   
}

/*
 *** This function for initial player 1 and player2
 */

function initialNewPlayers() {
    player1 = new PlayerOne();
    player2 = new PlayerTwo();
   
}
/*
 *** This function for initial result
 */

function initialResult() {
    ticTakToe.total_match = 1;
    ticTakToe.match_tie = 0;
   
}

/*
 *** This function basically when player mode single and checking winner player.
 */
function setResult() {
    $('.slot').attr('disabled', 'disabled');
    computer = getComputerNumber();
   
    setTimeout(function() {
        setSlotText(computer['number']);
        result = calculateGamePattern();
        if (result['player1Win'] == 1) {
             updateWinGame(1);
        } else if (result['player2Win'] == 1) {
             updateWinGame(2);
        } else if (move.count_slot == 10) {
             updateTieGame(4);
        }
        $('.slot').removeAttr('disabled');
    }, 888);

    
}
/*
 *** This function basically when player mode single and checking random number and gamepattern and return possible next number
 */
function getComputerNumber() {
    if (ticTakToe.singlePlayer == 1 && move.count_slot < 10) {

        let all_slot = player1.slotNumbers.concat(player2.slotNumbers);
        result = calculateGamePattern();

        if (result['computer_number2'] > 0) {
            computer_number = result['computer_number2'];
        } else {
            if (result['computer_number1'] > 0) {
                computer_number = result['computer_number1'];
            } else {
                computer_number = getRandomNumber();
            }

        }

        if (computer_number > 0 && computer_number < 10) {
            for (let i = 0; i < all_slot.length; i++) {
                if (all_slot[i] == computer_number) {
                    getComputerNumber();
                }

            };

        } else {
            getComputerNumber();
        }

        return {
            number: computer_number
        };
    }
    return {
        number: 0
    };
}
/*
 *** This function basically when play the game what text will show when press the slot or box it could be X or 0.
 */
function setSlotText(id) {
    if ($('.slot_' + id).text() == '') {
        if (move.startPlayer == 1) {
            if (move.count_slot % 2 == 0) {
                changePlayer2SlotText(id);
            } else {
                changePlayer1SlotText(id);
            }
        } else if (move.startPlayer == 2) {
            if (move.count_slot % 2 == 0) {
                changePlayer1SlotText(id);
            } else {
                changePlayer2SlotText(id);
            }
        } else if (move.startPlayer == 3) {
            if (move.count_slot % 2 == 0) {
                changePlayer1SlotText(id);
            } else {
                changePlayer2SlotText(id);
            }
        }
    }

}

/*
 *** This function basically changing player1 text
 */

function changePlayer1SlotText(id){
    $('.slot_' + id).text(player1.text);
    player1.slotNumbers[player1.slotNumbers.length] = id;
    move.count_slot = move.count_slot + 1;
}

/*
 *** This function basically changing player2 text
 */

function changePlayer2SlotText(id){
    $('.slot_' + id).text(player2.text);
    player2.slotNumbers[player2.slotNumbers.length] = id;
    move.count_slot = move.count_slot + 1;
}
/*
 *** This function basically when press the top button and active player mode change button background and color.
 */
function changeButtonColor() { //deactive:EB532D,active: DCFBDC
    if (ticTakToe.singlePlayer == 1) {
        changeColor('.single_player', '.double_player');
    }
    if (ticTakToe.doublePlayer == 1) {
        changeColor('.double_player', '.single_player');
    }

    if (othersHelper.mute == 1) {
        $('.mute').css('background-color', othersHelper.activeButtonBgColor);
        $('.mute').css('color', '#000');
    } else {
        $('.mute').css('background-color', othersHelper.deactiveButtonBgColor);
        $('.mute').css('color', '#fff');
    }
    if (othersHelper.reset == 1) {
        location.reload();
    }

}

function changeColor(activeClass, deactiveClass) {
    $(activeClass).css('background-color', othersHelper.activeButtonBgColor);
    $(activeClass).css('color', '#000');
    $(deactiveClass).css('background-color', othersHelper.deactiveButtonBgColor);
    $(deactiveClass).css('color', '#fff');
}
/*
 *** This function basically when press the top button and active player mode and change person text.
 */
function changePersonPlayer2Text(player2, person) {
    $('.player2').text(player2);
    $('.person_text').text(person);
}
//--------------------------------------------------------------------------------------------------

/*
 *** This function for audio on and off .
 */


function togglePlayPause() {
    song.paused ? song.play() : song.pause();
}


