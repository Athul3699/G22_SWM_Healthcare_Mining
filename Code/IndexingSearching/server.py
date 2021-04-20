# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
from search_requests import search
from search_requests_rank_sort import search_weighted

# Flask constructor takes the name of
# current module (_name_) as argument.
app = Flask(__name__)

CORS(app)
# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return render_template("index.html")
#
# @app.route('/home')
# def home_api():
#     return "From Home"


@app.route('/search', methods=["GET"])
@cross_origin()
def search_api():
    if request.method == "GET":
        # print(request.args)
        searchTerm = request.args.get(
            "searchTerm") + request.args.get("selectedFilters")
        # print(searchTerm)
        # # term = input("Enter search term")
        results, filters = search(searchTerm)
        sorted_results = search_weighted(searchTerm)
        return {"articles": results, "filters": filters, "sorted_results": sorted_results}


# main driver function
if __name__ == '__main__':
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()
