# G22_SWM_Healthcare_Mining

# How to run:


# Setting up Apache Solr

  cd G22_SWM_Healthcare_Mining/code/IndexingSearching/solr-8.8.1

  bin/solr start -c -p 8983 -s example/cloud/node1/solr

  bin/solr start -c -p 7574 -s example/cloud/node2/solr -z localhost:9983

  bin/solr create -c metamapData -s 2 -rf 2

  bin/solr create -c allData -s 2 -rf 2

  curl -X POST -H 'Content-type:application/json' --data-binary '{"add-copy-field" : {"source":"*","dest":"_text_"}}' http://localhost:8983/solr/metamapData/schema

  curl -X POST -H 'Content-type:application/json' --data-binary '{"add-copy-field" : {"source":"*","dest":"_text_"}}' http://localhost:8983/solr/allData/schema

  bin/post -c metamapData example/MetamapResult.csv

  bin/post -c allData example/stage1_scrapping.csv

  cd .. 

# Running the system

  IndexingSearching % python3 server.py



