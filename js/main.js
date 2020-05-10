/*
 *** This is main class object to play the game.
 */
class TicTakToe {
    constructor() {
        this.singlePlayer = 1;
        this.doublePlayer = 0;
        this.mute = 0;
        this.reset = 0;
        this.activeButtonBgColor = '#DCFBDC';
        this.deactiveButtonBgColor = '#EB532D';


        this.player1Text = 'X';
        this.player1_win = 0;

        this.player2_text = 'O';
        this.player2_win = 0;

        this.person_text = '1p';

        this.match_tie = 0;
        //0=blank, 1=player1 , 2=player2, 3=computer
        this.start_player = 1;
        this.current_player = 1;

        this.total_match = 1;

        this.player1 = [];
        this.player2 = [];
        this.count_slot = 1;

        this.win_pattern = ['1,5,9', '1,2,3', '1,4,7', '2,5,8', '3,5,7', '3,6,9', '4,5,6', '7,8,9'];


    }

}

const song = document.getElementById("myAudio");

/*
 *** This is main variable to play the game.
 */

let ticTakToe = new TicTakToe();

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
    ticTakToe = resetNewPlayerMode(ticTakToe);
    
    ticTakToe = initialResult(ticTakToe);
   
    ticTakToe.singlePlayer = player == 1 ? 1 : 0;
    ticTakToe.doublePlayer = player == 1 ? 0 : 1;
    ticTakToe = initialPlayer(ticTakToe);
    //changing button background and text color, changing person text and player2 text
    changePersonPlayer2Text(computerLabel, playerLabel);
    changeButtonColor(ticTakToe);
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

    resetPlayerAttribute(0,'Player2(O)', '2P');
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
function resetNewPlayerMode(tic_tak_toe) {
    tic_tak_toe = initialAllSlot(tic_tak_toe);
    tic_tak_toe = updateResultText(tic_tak_toe);

    return tic_tak_toe;
}
/*
 *** This function for initial all slot text and value.
 */

function initialAllSlot(tic_tak_toe) {
    tic_tak_toe.count_slot = 1;
    tic_tak_toe.player1 = [];
    tic_tak_toe.player2 = [];
    for (let i = 1; i < 10; i++) {
        $('.slot_' + i).text('');
    };
    return tic_tak_toe;
}
/*
 *** This function set reset for switch one player mode to two player or two player mode. All data will wiped out in browser.
 */
function resetForNewMatch(tic_tak_toe) {
    tic_tak_toe = initialAllSlot(tic_tak_toe);
    tic_tak_toe = initialPlayer(tic_tak_toe);
    if (tic_tak_toe.singlePlayer == 1 && tic_tak_toe.total_match % 2 == 0) {
        tic_tak_toe = getGameResult(tic_tak_toe);
    }

    tic_tak_toe = updateResultText(tic_tak_toe);
    return tic_tak_toe;
}
/*
 *** This function for sound off or pause the background audio music.
 */
function muteSound() {
    togglePlayPause();
    if (ticTakToe.mute == 0) {
        ticTakToe.mute = 1
    } else {
        ticTakToe.mute = 0;
    }

    changeButtonColor(ticTakToe);
}
/*
 *** This function close any popup box in this window.
 */
function closePopup() {

    ticTakToe = resetForNewMatch(ticTakToe);
    changeButtonColor(ticTakToe);
    // 
    $('body').removeAttr('onclick');
    ticTakToe = updateResultText(ticTakToe);
    $('.slot').removeAttr('disabled');

}

/*
 *** This function mainly initial player mode mean every game should be two way flow. If one player play first, second player should play first for next game.
 */
function initialPlayer(btn) {
    if (btn.singlePlayer == 1) {
        btn.start_player = btn.total_match % 2 == 0 ? 3 : 1;
    } else if (btn.doublePlayer == 1) {
        btn.start_player = btn.total_match % 2 == 0 ? 2 : 1;        
    }

    return btn;
}

/*
 *** This function update game result show in result section
 */
function updateResultText(tic_tak_toe) {
    //console.log('yes');   
    $('.player1_win').text(tic_tak_toe.player1_win);
    $('.player2_win').text(tic_tak_toe.player2_win);
    $('.match_tie').text(tic_tak_toe.match_tie);
    return tic_tak_toe;
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
function updateWinGame(tic_tak_toe, player) {
    tic_tak_toe.total_match = tic_tak_toe.total_match + 1;
    //tic_tak_toe = updateResultText(tic_tak_toe);
    if (player == 1) {
        tic_tak_toe.player1_win = tic_tak_toe.player1_win + 1;
        successGamePopup(1);
    }
    if (player == 2 && tic_tak_toe.singlePlayer == 1) {
        tic_tak_toe.player2_win = tic_tak_toe.player2_win + 1;
        loseGamePopup();
    }
    if (player == 2 && tic_tak_toe.doublePlayer == 1) {
        tic_tak_toe.player2_win = tic_tak_toe.player2_win + 1;
        successGamePopup(2);
    }
    return tic_tak_toe;
}

function updateTieGame(tic_tak_toe, player) {

    if (player == 3) {
        tic_tak_toe = getGameResult(tic_tak_toe);

    } else {
        tic_tak_toe.match_tie = tic_tak_toe.match_tie + 1;
        tic_tak_toe.total_match = tic_tak_toe.total_match + 1;
        //tic_tak_toe=updateResultText(tic_tak_toe);
        tieGamePopup();
    }
    return tic_tak_toe;
}


/*
 *** This function run the game when select any slot and udating and runing the game
 */
function selectSlot(btn) {
    if (ticTakToe.count_slot <= 10) {

        if (ticTakToe.singlePlayer == 1) {

            if ($('.slot_' + btn).text() == '') {
                ticTakToe = setSlotText(btn, ticTakToe);
                result = calculateGamePattern(ticTakToe);
                if (result['player1'] == 1) {
                    ticTakToe = updateWinGame(ticTakToe, 1);
                } else if (result['player2'] == 1) {
                    ticTakToe = updateWinGame(ticTakToe, 2);
                } else if (ticTakToe.count_slot == 10) {
                    ticTakToe = updateTieGame(ticTakToe, ticTakToe.start_player);

                } else {
                    ticTakToe = getGameResult(ticTakToe);
                }
            }


        } else if (ticTakToe.doublePlayer == 1) {

            if ($('.slot_' + btn).text() == '') {
                ticTakToe = setSlotText(btn, ticTakToe);
                result = calculateGamePattern(ticTakToe);
                if (result['player1'] == 1) {
                    $('.slot').attr('disabled', 'disabled');
                    ticTakToe = updateWinGame(ticTakToe, 1);
                } else if (result['player2'] == 1) {
                    $('.slot').attr('disabled', 'disabled');
                    ticTakToe = updateWinGame(ticTakToe, 2);
                } else if (ticTakToe.count_slot == 10) {
                    $('.slot').attr('disabled', 'disabled');
                    ticTakToe = updateTieGame(ticTakToe, 4);
                }
            }

        }
    } else {
        $(".win_popup").click();
    }

}
/*
 *** This function mainly check the game pattern when play the sigle mode game and select slot for  each face and given result an array for next getRanddom number.
 */
function calculateGamePattern(tic_tak_toe) {
    //this is local variable for player1 win check. if it is 1 means player1 win
    let player1 = 0;

    //this is local variable for player2 win check. if it is 1 means player2 win
    let player2 = 0;

    //this is local variable when player mode single player and what is next slot should be as a computer after checking player1 win pattern.
    let computer_number1 = 0;

    //this is local variable when player mode single player and what is next slot should be as a computer after checking computer win pattern.
    let computer_number2 = 0;

    //this loop for checking win pattern for both and outcome possible number or win player
    for (let i = 0; i < tic_tak_toe.win_pattern.length; i++) {
        //winner pattern string to array convert
        pattern = tic_tak_toe.win_pattern[i];
        pattern_array = pattern.split(',');

        //how many times player1 equal to win pattern
        count_pattern_player1 = 0;

        //how many times player2 or conputer equal to win pattern
        count_pattern_player2 = 0;

        //checking winner pattern in both two player
        for (let j in pattern_array) {

            for (let k in tic_tak_toe.player1) {
                if (tic_tak_toe.player1[k] == pattern_array[j]) {
                    count_pattern_player1 = count_pattern_player1 + 1;
                }
            }
            for (let l in tic_tak_toe.player2) {
                if (tic_tak_toe.player2[l] == pattern_array[j]) {
                    count_pattern_player2 = count_pattern_player2 + 1;
                }
            }

        }
        // count_pattern_player1 equal to 3 means player1 win
        if (count_pattern_player1 == 3) {
            player1 = player1 + 1;
        }

        // count_pattern_player2 equal to 3 means player2 or computer win
        if (count_pattern_player2 == 3) {
            player2 = player2 + 1;
        }

        // count_pattern_player1 equal to 2 means what next computer number should be if player1 win pattern equal 2 out of 3
        if (count_pattern_player1 == 2) {
            for (let j in pattern_array) {
                check1 = tic_tak_toe.player1.find(function(number) {
                    return number == pattern_array[j];
                });
                check2 = tic_tak_toe.player2.find(function(number) {
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
                check1 = tic_tak_toe.player1.find(function(number) {
                    return number == pattern_array[j];
                });
                check2 = tic_tak_toe.player2.find(function(number) {
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
        player1: player1,
        player2: player2,
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
 *** This function initial result mean all result value will be initial.
 */
function initialResult(btn) {
    btn.player1_win = 0;
    btn.player2_win = 0;
    btn.match_tie = 0;
    $('.player1_win').text(btn.player1_win);
    $('.player2_win').text(btn.player2_win);
    $('.match_tie').text(btn.match_tie);
    return btn;
}
/*
 *** This function basically when player mode single and checking winner player.
 */
function getGameResult(btn) {
    $('.slot').attr('disabled', 'disabled');
    computer = getComputerNumber(btn);
    btn = computer['btn'];
    setTimeout(function() {
        btn = setSlotText(computer['number'], btn);
        result = calculateGamePattern(btn);
        if (result['player1'] == 1) {
            ticTakToe = updateWinGame(ticTakToe, 1);
        } else if (result['player2'] == 1) {
            ticTakToe = updateWinGame(ticTakToe, 2);
        } else if (btn.count_slot == 10) {
            ticTakToe = updateTieGame(ticTakToe, 4);
        }
        $('.slot').removeAttr('disabled');
    }, 888);

    return btn;
}
/*
 *** This function basically when player mode single and checking random number and gamepattern and return possible next number
 */
function getComputerNumber(btn) {
    if (btn.singlePlayer == 1 && btn.count_slot < 10) {

        let all_slot = btn.player1.concat(btn.player2);
        result = calculateGamePattern(btn);

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
                    getComputerNumber(btn);
                }

            };

        } else {
            getComputerNumber(btn);
        }

        return {
            btn: btn,
            number: computer_number
        };
    }
    return {
        btn: btn,
        number: 0
    };
}
/*
 *** This function basically when play the game what text will show when press the slot or box it could be X or 0.
 */
function setSlotText(id, tic_tak_toe) {
    if ($('.slot_' + id).text() == '') {
        if (tic_tak_toe.start_player == 1) {
            if (tic_tak_toe.count_slot % 2 == 0) {
                tic_tak_toe=changePlayer2SlotText(id,tic_tak_toe);
            } else {
                tic_tak_toe=changePlayer1SlotText(id,tic_tak_toe);
            }
        } else if (tic_tak_toe.start_player == 2) {
            if (tic_tak_toe.count_slot % 2 == 0) {
                tic_tak_toe=changePlayer1SlotText(id,tic_tak_toe);
            } else {
                tic_tak_toe=changePlayer2SlotText(id,tic_tak_toe);
            }
        } else if (tic_tak_toe.start_player == 3) {
            if (tic_tak_toe.count_slot % 2 == 0) {
                tic_tak_toe=changePlayer1SlotText(id,tic_tak_toe);
            } else {
                tic_tak_toe=changePlayer2SlotText(id,tic_tak_toe);
            }
        }
    }


    return tic_tak_toe;
}

/*
 *** This function basically changing player1 text
 */

function changePlayer1SlotText(id,tic_tak_toe){
    $('.slot_' + id).text(tic_tak_toe.player1Text);
    tic_tak_toe.player1[tic_tak_toe.player1.length] = id;
    ticTakToe.count_slot = ticTakToe.count_slot + 1;
    return tic_tak_toe;
}

/*
 *** This function basically changing player2 text
 */

function changePlayer2SlotText(id,tic_tak_toe){
    $('.slot_' + id).text(tic_tak_toe.player2_text);
    tic_tak_toe.player2[tic_tak_toe.player2.length] = id;
    ticTakToe.count_slot = ticTakToe.count_slot + 1;
    return tic_tak_toe;
}
/*
 *** This function basically when press the top button and active player mode change button background and color.
 */
function changeButtonColor(tic_tak_toe) { //deactive:EB532D,active: DCFBDC
    if (tic_tak_toe.singlePlayer == 1) {
        changeColor('.single_player', '.double_player', tic_tak_toe);
    }
    if (tic_tak_toe.doublePlayer == 1) {
        changeColor('.double_player', '.single_player', tic_tak_toe);
    }

    if (tic_tak_toe.mute == 1) {
        $('.mute').css('background-color', tic_tak_toe.activeButtonBgColor);
        $('.mute').css('color', '#000');
    } else {
        $('.mute').css('background-color', tic_tak_toe.deactiveButtonBgColor);
        $('.mute').css('color', '#fff');
    }
    if (tic_tak_toe.reset == 1) {
        location.reload();
    }

}

function changeColor(activeClass, deactiveClass, tic_tak_toe) {
    $(activeClass).css('background-color', tic_tak_toe.activeButtonBgColor);
    $(activeClass).css('color', '#000');
    $(deactiveClass).css('background-color', tic_tak_toe.deactiveButtonBgColor);
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


