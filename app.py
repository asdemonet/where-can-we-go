from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from os import environ
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get(
    "DATABASE_URL", "postgres://uvkevmfeflgftz:2a6425e69fd223d481c141d4132fcc9bad2d1a23602d3d0fab9e5b9e703803cf@ec2-52-23-190-126.compute-1.amazonaws.com:5432/d4jqhhtr5hhroa")
db = SQLAlchemy(app)
class FINAL_MERGE(db.Model):
    index = db.Column(db.Integer, primary_key=True)
    ITIN_ID = db.Column(db.Integer)
    COUPONS = db.Column(db.Integer)
    YEAR = db.Column(db.Integer)
    ORIGIN_AIRPORT_ID = db.Column(db.Integer)
    QUARTER = db.Column(db.Integer)
    ORIGIN = db.Column(db.String)
    DEST_AIRPORT_ID = db.Column(db.Integer)
    DEST = db.Column(db.String)
    TICKET_CARRIER = db.Column(db.String)
    OPERATING_CARRIER = db.Column(db.String)
    REPORTING_CARRIER = db.Column(db.String)
    PASSENGERS = db.Column(db.Integer)
    FARE_CLASS = db.Column(db.String)
    DISTANCE_GROUP = db.Column(db.Integer)
    ITIN_GEO_TYPE = db.Column(db.Integer)
    ROUNDTRIP = db.Column(db.Integer)
    ITIN_FARE = db.Column(db.Integer)
    MILES_FLOWN = db.Column(db.Integer)
class L_AIRPORT_ID(db.Model):
    index = db.Column(db.Integer, primary_key=True)
    CODE = db.Column(db.Integer)
    Description = db.Column(db.String)
class L_UNIQUE_CARRIERS(db.Model):
    index = db.Column(db.Integer, primary_key=True)
    CODE = db.Column(db.Integer)
    Description = db.Column(db.String)
class RDUCurrentDestinations(db.Model):
    index = db.Column(db.Integer, primary_key=True)
    DEST_AIRPORT_ID = db.Column(db.Integer)
    DEST = db.Column(db.String)
    DEST_CITY_NAME = db.Column(db.String)
    DISTANCE = db.Column(db.Integer)
    DISTANCE_GROUP = db.Column(db.Integer)
    CITY = db.Column(db.String)
    STATE = db.Column(db.String)
    LATITUDE = db.Column(db.Integer)
    LONGITUDE = db.Column(db.Integer)
class RDUCurrentFlights(db.Model):
    index = db.Column(db.Integer, primary_key=True)
    OP_UNIQUE_CARRIER = db.Column(db.String)
    OP_CARRIER_FL_NUM = db.Column(db.Integer)
    DEST_AIRPORT_ID = db.Column(db.Integer)
    DEST = db.Column(db.String)
    DEST_CITY_NAME = db.Column(db.String)
    DISTANCE = db.Column(db.Integer)
    DISTANCE_GROUP = db.Column(db.Integer)
class RDU_2015_19_Delays_Causes_ML(db.Model):
    index = db.Column(db.Integer, primary_key=True)
    YEAR = db.Column(db.Integer)
    QUARTER = db.Column(db.Integer)
    MONTH = db.Column(db.Integer)
    DATE_OF_MONTH = db.Column(db.Integer)
    DATE_OF_WEEK = db.Column(db.Integer)
    FL_DATE = db.Column(db.Date)
    OP_UNIQUE_CARRIER = db.Column(db.String)
    OP_CARRIER_FL_NUM = db.Column(db.Integer)
    ORIGIN_AIRPORT_ID = db.Column(db.Integer)
    ORIGIN = db.Column(db.String)
    ORIGIN_WAC = db.Column(db.Integer)
    DEST_AIRPORT_ID = db.Column(db.Integer)
    DEST = db.Column(db.String)
    DEST_CITY_NAME = db.Column(db.String)
    DEST_STATE_ABR = db.Column(db.String)
    DEST_WAC = db.Column(db.Integer)
    CRS_DEP_TIME = db.Column(db.Integer)
    DEP_TIME = db.Column(db.Integer)
    DEP_DELAY = db.Column(db.Integer)
    DEP_TIME_NEW = db.Column(db.Integer)
    DEP_DEL15 = db.Column(db.Integer)
    DEP_DELAY_GROUP = db.Column(db.Integer)
    DEP_TIME_BLK = db.Column(db.String)
    CRS_ARR_TIME = db.Column(db.Integer)
    ARR_TIME = db.Column(db.Integer)
    ARR_DELAY = db.Column(db.Integer)
    ARR_DELAY_NEW = db.Column(db.Integer)
    ARR_DEL15 = db.Column(db.Integer)
    ARR_DELAY_GROUP = db.Column(db.String)
    ARR_TIME_BLK = db.Column(db.String)
    CANCELLED = db.Column(db.Integer)
    CANCELLATION_CODE = db.Column(db.String)
    DIVERTED = db.Column(db.Integer)
    CRS_ELAPSED_TIME = db.Column(db.Integer)
    ACTUAL_ELAPSED_TIME = db.Column(db.Integer)
    AIR_TIME = db.Column(db.Integer)
    DISTANCE = db.Column(db.Integer)
    DISTANCE_GROUP = db.Column(db.Integer)
    CARRIER_DELAY = db.Column(db.Integer)
    WEATHER_DELAY = db.Column(db.Integer)
    NAS_DELAY = db.Column(db.Integer)
    SECURITY_DELAY = db.Column(db.Integer)
    LATE_AIRCRAFT_DELAY = db.Column(db.Integer)
@app.route("/")
def index():
    return render_template("index.html")
@app.route("/api/FINAL_MERGE")
def getFINAL_MERGEPosgres():
    flights = db.session.query(FINAL_MERGE)
    FINAL_MERGEdata = []
    for flight in flights:
        item = {
            "index": flight.index,
            "ITIN_ID": flight.ITIN_ID,
            "COUPONS": flight.COUPONS,
            "YEAR": flight.YEAR,
            "ORIGIN_AIRPORT_ID": flight.ORIGIN_AIRPORT_ID,
            "QUARTER": flight.QUARTER,
            "ORIGIN": flight.ORIGIN,
            "DEST_AIRPORT_ID": flight.DEST_AIRPORT_ID,
            "DEST": flight.DEST,
            "TICKET_CARRIER": flight.TICKET_CARRIER,
            "OPERATING_CARRIER": flight.OPERATING_CARRIER,
            "REPORTING_CARRIER": flight.REPORTING_CARRIER,
            "PASSENGERS": flight.PASSENGERS,
            "FARE_CLASS": flight.FARE_CLASS,
            "DISTANCE_GROUP": flight.DISTANCE_GROUP,
            "ITIN_GEO_TYPE": flight.ITIN_GEO_TYPE,
            "ROUNDTRIP": flight.ROUNDTRIP,
            "ITIN_FARE": flight.ITIN_FARE,
            "MILES_FLOWN": flight.MILES_FLOWN
        }
        FINAL_MERGEdata.append(item)
    return jsonify(FINAL_MERGEdata)
@app.route("/api/L_AIRPORT_ID")
def getL_AIRPORT_IDPosgres():
    airports = db.session.query(L_AIRPORT_ID)
    L_AIRPORT_ID = []
    for airport in airports:
        item = {
            "index": airport.index,
            "Code": airport.Code,
            "Description": airport.Description
        }
        L_AIRPORT_ID.append(item)
    return jsonify(L_AIRPORT_ID)
@app.route("/api/L_UNIQUE_CARRIERS")
def getL_UNIQUE_CARRIERSPosgres():
    carriers = db.session.query(L_UNIQUE_CARRIERS)
    L_UNIQUE_CARRIERS = []
    for carrier in carriers:
        item = {
            "index": carrier.index,
            "Code": carrier.Code,
            "Description": carrier.Description
        }
        L_UNIQUE_CARRIERS.append(item)
    return jsonify(L_UNIQUE_CARRIERS)
@app.route("/api/RDUCurrentDestinations")
def getRDUCurrentDestinationsPosgres():
    print("beginning query")
    Destinations = db.session.query(RDUCurrentDestinations)
    CurrentDestinations = []
    print("finished query")
    print(Destinations)
    for Destination in Destinations:
        print(Destination)
        item = {
            "index": Destination.index,
            "DEST_AIRPORT_ID": Destination.DEST_AIRPORT_ID,
            "DEST": Destination.DEST,
            "DEST_CITY_NAME": Destination.DEST_CITY_NAME,
            "DISTANCE": Destination.DISTANCE,
            "DISTANCE_GROUP": Destination.DISTANCE_GROUP,
            "CITY": Destination.CITY,
            "STATE": Destination.STATE,
            "LATITUDE": Destination.LATITUDE,
            "LONGITUDE": Destination.LONGITUDE
        }
        CurrentDestinations.append(item)
        print(CurrentDestinations)
    return jsonify(CurrentDestinations)
@app.route("/api/RDUCurrentFlights")
def getRDUCurrentFlightsPosgres():
    Current_Flights = db.session.query(RDUCurrentFlights)
    cf = []
    for Current_Flight in Current_Flights:
        item = {
            "index": Current_Flight.index,
            "OP_UNIQUE_CARRIER": Current_Flight.OP_UNIQUE_CARRIER,
            "OP_CARRIER_FL_NUM": Current_Flight.OP_CARRIER_FL_NUM,
            "DEST_AIRPORT_ID": Current_Flight.DEST_AIRPORT_ID,
            "DEST": Current_Flight.DEST,
            "DEST_CITY_NAME": Current_Flight.DEST_CITY_NAME,
            "DISTANCE": Current_Flight.DISTANCE,
            "DISTANCE_GROUP": Current_Flight.DISTANCE_GROUP
                }
        cf.append(item)
    return jsonify(cf)
@app.route("/api/RDU_2015_19_Delays_Causes_ML")
def getRDU_2015_19_Delays_Causes_MLPosgres():
    Delay_Causes = db.session.query(RDU_2015_19_Delays_Causes_ML)
    Delays = []
    for Delay_Cause in Delay_Causes:
        item = {
            "index": Delay_Cause.index,
            "YEAR": Delay_Cause.YEAR,
            "QUARTER": Delay_Cause.QUARTER,
            "MONTH": Delay_Cause.MONTH,
            "DAY_OF_MONTH": Delay_Cause.DAY_OF_MONTH,
            "DAY_OF_WEEK": Delay_Cause.DAY_OF_WEEK,
            "FL_DATE": Delay_Cause.FL_DATE,
            "OP_UNIQUE_CARRIER": Delay_Cause.OP_UNIQUE_CARRIER,
            "OP_CARRIER_FL_NUM": Delay_Cause.OP_CARRIER_FL_NUM,
            "ORIGIN_AIRPORT_ID": Delay_Cause.ORIGIN_AIRPORT_ID,
            "ORIGIN": Delay_Cause.ORIGIN,
            "ORIGIN_WAC": Delay_Cause.ORIGIN_WAC,
            "DEST_AIRPORT_ID": Delay_Cause.DEST_AIRPORT_ID,
            "DEST": Delay_Cause.DEST,
            "DEST_CITY_NAME": Delay_Cause.DEST_CITY_NAME,
            "DEST_STATE_ABR": Delay_Cause.DEST_STATE_ABR,
            "DEST_WAC": Delay_Cause.DEST_WAC,
            "CRS_DEP_TIME": Delay_Cause.CRS_DEP_TIME,
            "DEP_TIME": Delay_Cause.DEP_TIME,
            "DEP_DELAY": Delay_Cause.DEP_DELAY,
            "DEP_DELAY_NEW": Delay_Cause.DEP_DELAY_NEW,
            "DEP_DEL15": Delay_Cause.DEP_DEL15,
            "DEP_DELAY_GROUP": Delay_Cause.DEP_DELAY_GROUP,
            "DEP_TIME_BLK": Delay_Cause.DEP_TIME_BLK,
            "CRS_ARR_TIME": Delay_Cause.CRS_ARR_TIME,
            "ARR_TIME": Delay_Cause.ARR_TIME,
            "ARR_DELAY": Delay_Cause.ARR_DELAY,
            "ARR_DELAY_NEW": Delay_Cause.ARR_DELAY_NEW,
            "ARR_DEL15": Delay_Cause.ARR_DEL15,
            "ARR_DELAY_GROUP": Delay_Cause.ARR_DELAY_GROUP,
            "ARR_TIME_BLK": Delay_Cause.ARR_TIME_BLK,
            "CANCELLED": Delay_Cause.CANCELLED,
            "CANCELLATION_CODE": Delay_Cause.CANCELLATION_CODE,
            "DIVERTED": Delay_Cause.DIVERTED,
            "CRS_ELAPSED_TIME": Delay_Cause.CRS_ELAPSED_TIME,
            "ACTUAL_ELAPSED_TIME": Delay_Cause.ACTUAL_ELAPSED_TIME,
            "AIR_TIME": Delay_Cause.AIR_TIME,
            "DISTANCE": Delay_Cause.DISTANCE,
            "DISTANCE_GROUP": Delay_Cause.DISTANCE_GROUP,
            "CARRIER_DELAY": Delay_Cause.CARRIER_DELAY,
            "WEATHER_DELAY": Delay_Cause.WEATHER_DELAY,
            "NAS_DELAY": Delay_Cause.NAS_DELAY,
            "SECURITY_DELAY": Delay_Cause.SECURITY_DELAY,
            "LATE_AIRCRAFT_DELAY": Delay_Cause.LATE_AIRCRAFT_DELAY
        }
        Delays.append(item)
    return jsonify(Delays)
if __name__ == "__main__":
    app.run(debug=True)















