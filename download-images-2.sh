#!/bin/bash
mkdir -p images/downloaded
cd images/downloaded

urls=(
"https://lh3.googleusercontent.com/gps-proxy-s/AC9h4nqJgd-hO5z2xGN5eZYWSJON9Y5IZ82gggmJYuQ7yKPm80R2TD4eRJJ0Fj297JG0UmK_jEQASdhCaZv4joczCgMEc3u89h8y_e_JbLU2jTwRxrxnqpmgqM-EqI3OAIgOeqBs6YMTIA=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-proxy-s/AC9h4nqAHUvCsIcrutl0hxMxtJTToH7RIwhwepCwS3kbNqSI-g1EmU-j3b6A8y7bzr7Qevsi2kwpGX-fLikJzd2339oKLSe3_CJIa5YeuyAQgUncuwPtA3mN_5hYpiLOrlhB2sMls29k=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-proxy-s/AC9h4nrQdBi1uUeEwfnY3vPnmUS7mnQO65W9_xxRONNtsDOOzoaPPP4GKbSb3Ob5cz4ZGS2hVCwPH90oGISfpL7DAJ9WgLsLjGa_xy7Yx5O58kQsUnW3iNGG5CDUtKQHnoCNI6KaMDQ=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-proxy-s/AC9h4nr5RiI18URsVpr_PE4J-y9KBn4h8psIVsKSR8AH25o2lk1akK263Gk87Sdi8pW3Cl6qx0UvFpy_J9LB51SlqbjoEFiPRiwZmX-QDo0UfMW-u-7HZeV31x1wQCDSMkTtHd1U7EE=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-proxy-s/AC9h4nqlNrO4oz0PlHOjzcHi2J-mNaxQvvKG56AUfE_47fxkuIvyBS3_fiy06Hzf_BcInt8AVahAoo9uurVIvxO9aIhq-BbTlzkVIseh_rArpTLmlosAWw9tr143Y5aqdYtBHfwyn4huRQ=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-proxy-s/AC9h4nrE3BTNaozxLEbfT4muw2zWa-V1x0DqpfD23SP5fIqx2oT01ncwVV6CupMYbl9T_dfi6neS3nxHV4_oKtLIE1PJnfjuyPdGxYgQFbCxCcwkUnu14QtenShoxGHygPnrZSTJaGcF=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-proxy-s/AC9h4npgWgSiFzKDY4xPq3-N4qfijzh1a7lUWWiqoE-xJowTFAgGlBD6HfSNUsadTFPf5XFXfNHpJx5kp0w8WXpJjxDtAQLq1HGl0gC7w22FkLjT1iINf-BLQCx-xjs_jbvMIeDzGYlO=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-proxy-s/AC9h4noHcFTE2sSTOwaZrBLIUwhuAhEEiyhqo1Dxiow1nfss6TW9yXJJGYk6vjZ_Dz10SzO-9jcbeZcPlNkBIgAdaBSAf5Okw1kdepBKgJu_UDXhLnumz5jCe60vUGWEDS_CTOg2yu9oZg=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-proxy-s/AC9h4np_QSxuNFAvOmdYqCNKIO7c5fok4yXPj4e01ytUQNOse_POc2hoe6Ix8Ab0VLEU3Wx7gLUJMhqHT96EAAEHzK0JJrJ2qowVWEDNxTF9C5J9KzSfWjS1Bw-dQhVNapuCBeRYjMUj=w1920-h1080-k-no"
)

counter=1
for url in "${urls[@]}"; do
  echo "Downloading image $counter..."
  curl -s -L "$url" -o "gallery-$counter.jpg"
  if [ -f "gallery-$counter.jpg" ] && [ -s "gallery-$counter.jpg" ]; then
    echo "✅ Downloaded gallery-$counter.jpg"
  else
    echo "❌ Failed to download gallery-$counter.jpg"
  fi
  counter=$((counter + 1))
done
