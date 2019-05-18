open System

let samples = [
  [1;1;1;5;1], 2050
  [2;3;4;6;2], 0
  [3;4;5;3;3], 350
  [1;5;1;2;4], 250
  [5;5;5;5;5], 2000
  [1;1;1;5;1;1], 4050
  [2;3;4;6;2;3], 0
  [5;5;5;5;5;5], 4000
  [2;2;2;2;2], 800
  [2;2;2;2;2;2], 1600
  [2;2;3;3;4;4], 800
  [1;2;3;4;5;6], 1200
]

let scoresForSet = [1000; 200; 300; 400; 500; 600]

let multipliers = [3, 1; 4, 2; 5, 4 ; 6, 8]

let maxDiceInSet:int = multipliers |> List.map fst |> List.max
let minDiceInSet:int = multipliers |> List.map fst |> List.min

let getMultiplierForSetSize (setSize: int): int =
    multipliers |> List.find (fun (numDice, _multiplier) -> setSize = numDice) |> snd

let getScoreForSet (setDie: int) :int =
    scoresForSet |> List.item (setDie - 1)

let scoreAGroup (group: int list) : int =
    match group with
    | _ when List.length group >= minDiceInSet -> getScoreForSet(List.head group) * getMultiplierForSetSize(group.Length)
    | h::_ when h = 5 -> 50 * group.Length
    | h::_ when h = 1 -> 100 * group.Length
    | _ -> 0

let calculateMixedGroupsAndSets (diceGroups:(int*int list) list):int =
    diceGroups
    |> List.sumBy(snd>>scoreAGroup)

let calculateScore (diceThrown:int list):int =
    let sortedDice = List.sort diceThrown
    let diceGroups = sortedDice |> List.groupBy id

    if List.length diceGroups = 3 && diceGroups |> List.map snd |> List.forall (fun (x) -> List.length x = 2) then
        800
    else if List.length diceGroups = 6 && diceGroups |> List.map snd |> List.forall (fun (x) -> List.length x = 1) then
        1200
    else
        calculateMixedGroupsAndSets diceGroups

[<EntryPoint>]
let main argv =
    samples 
    |> List.map (fst>>calculateScore)
    |> List.iter (printfn "Score: %A")
    0
