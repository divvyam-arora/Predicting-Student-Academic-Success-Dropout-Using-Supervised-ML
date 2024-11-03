from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the machine learning model
model_filename = "/Users/divvyamarora/Desktop/Work/Misc. Work/School/CLASS 11/General/School Events Material/Summer Programs/SPCS/Project/Code/Backend/stack_model.pkl"
with open(model_filename, 'rb') as model_file:
    model = pickle.load(model_file)

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get JSON data from the request
    
    # Prepare the features DataFrame
    features = {
        'Course': data['Course'],  # Categorical variable
        'Tuition fees up to date': data['Tuition fees up to date'],
        'Curricular units 1st sem (enrolled)': data['Curricular units 1st sem (enrolled)'],
        'Curricular units 1st sem (evaluations)': data['Curricular units 1st sem (evaluations)'],
        'Curricular units 1st sem (approved)': data['Curricular units 1st sem (approved)'],
        'Curricular units 2nd sem (approved)': data['Curricular units 2nd sem (approved)'],
        'Curricular units 2nd sem (grade)': data['Curricular units 2nd sem (grade)']
    }
    
    features_df = pd.DataFrame([features])  # Convert to DataFrame for the model
    
    # Make the prediction
    prediction = model.predict(features_df)  # Make prediction
    
    # Map the prediction to "dropout" or "no dropout"
    result = 'dropout' if prediction[0] == 1 else 'no dropout'
    
    return jsonify({'result': result})  # Return the prediction

# Run the application
if __name__ == '__main__':
    app.run(debug=True, port=5004)