from typing import List
import requests
import json


def get_dummy_coordinates() -> List[List[float]]:
    """
    Returns dummy coordinates for testing purposes
    """
    return [
        [51.57275438051, -0.14010598846],
        [51.57268968383, -0.14028988539],
        [51.57246077121, -0.14007428972]
    ]

def plan_route(from_: str, to_: str):
    base_url = f'https://api.tfl.gov.uk/Journey/JourneyResults/{from_}/to/{to_}'
    response = requests.get(base_url)
    content = response.json()
    return json.loads(content['journeys'][0]['legs'][1]['path']['lineString'])
