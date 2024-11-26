def calculate_team_performance(results):
    # Count wins and losses in the team results
    wins = results.count("win")
    losses = results.count("lose")
    total_games = wins + losses
    result = wins
    
    # Apply bonus if the team won more than half of their matches
    if wins > total_games / 2:
        result += 1  # Bonus for good team performance
    
    return result


def player_performance(scores):
    # Calculate the average score of the player
    total_score = sum(scores)
    num_games = len(scores)
    average_score = total_score / num_games if num_games > 0 else 0
    
    # Add bonus points for games with scores over 30
    bonus_points = sum(1 for score in scores if score > 30)
    average_score += bonus_points  # Applying the bonus
    
    return average_score


def final_report(team_results, player_averages, performance_threshold=3):
    team_performance = calculate_team_performance(team_results)
    avg_player_performance = sum(player_averages) / len(player_averages) if player_averages else 0
    
    # Evaluate team performance
    if team_performance > performance_threshold:
        print("Excellent team")
    else:
        print("Needs Improvement")

    # Evaluate individual player performance
    if avg_player_performance < performance_threshold:
        print("Needs improvement for individual players")
    else:
        print("Well done")


# Example usage
team_results = ["win", "lose", "win"]
player_scores = [[25, 30, 34], [12, 2, 3], [4, 5, 10]]  # Scores for each player

# Calculate player averages
player_averages = [player_performance(scores) for scores in player_scores]

# Generate final report
final_report(team_results, player_averages)
