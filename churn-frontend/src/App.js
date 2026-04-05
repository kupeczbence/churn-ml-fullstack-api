import { useState } from "react";

function App() {
  const [tenure, setTenure] = useState("");
  const [monthly, setMonthly] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenure: Number(tenure),
          MonthlyCharges: Number(monthly),
          TotalCharges: Number(total),
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("API error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          📊 Churn Predictor
        </h1>

        <div className="space-y-4">
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="Tenure"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />

          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            placeholder="Monthly Charges"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />

          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="Total Charges"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />
        </div>

        <button
          onClick={handlePredict}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-800 rounded-xl text-center">
            <h2 className="text-xl font-semibold mb-2">
              Prediction:{" "}
              <span
                className={
                  result.prediction === "Churned"
                    ? "text-red-400"
                    : "text-green-400"
                }
              >
                {result.prediction}
              </span>
            </h2>

            <p>
              {(result.churn_probability * 100).toFixed(2)}%
            </p>

            <div className="w-full bg-gray-700 h-3 rounded-full mt-2">
              <div
                className="h-3 bg-red-500"
                style={{
                  width: `${result.churn_probability * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;