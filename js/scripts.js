document.addEventListener("DOMContentLoaded", () => {
  console.log("Calculator App Loaded");

  // 1. Simple Interest Calculator
  document.getElementById("simpleInterestForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const P = parseFloat(document.getElementById("si-principal").value);
    const R = parseFloat(document.getElementById("si-rate").value);
    const T_years = parseFloat(document.getElementById("si-time").value);
    const T_months = parseFloat(document.getElementById("si-months").value) || 0;

    if (isNaN(P) || isNaN(R) || isNaN(T_years) || T_months < 0 || T_months > 11 || P < 0 || T_years < 0 || R < 0) {
      document.getElementById("siResult").innerHTML = '<span class="text-danger">Please enter valid numbers in all fields (months 0-11).</span>';
      return;
    }

    const totalTime = T_years + (T_months / 12);
    const SI = (P * R * totalTime) / 100;

    document.getElementById("siResult").innerHTML = `
      <p>Simple Interest: <strong>₹${SI.toFixed(2)}</strong></p>
      <p>Total Amount after ${T_years} years and ${T_months} months: <strong>₹${(P + SI).toFixed(2)}</strong></p>
    `;
  });

  // 2. Compound Interest Calculator
  document.getElementById("compoundInterestForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const P = parseFloat(document.getElementById("ci-principal").value);
    const R = parseFloat(document.getElementById("ci-rate").value);
    const T_years = parseFloat(document.getElementById("ci-time").value);
    const N = parseInt(document.getElementById("ciFrequency").value);
    const T_months = parseFloat(document.getElementById("ci-months").value) || 0;

    if (isNaN(P) || isNaN(R) || isNaN(T_years) || isNaN(N) || P < 0 || R < 0 || T_years < 0 || T_months < 0 || T_months > 11) {
      document.getElementById("ciResult").innerHTML = '<span class="text-danger">Please enter valid numbers in all fields (months 0-11).</span>';
      return;
    }

    const T_total = T_years + (T_months / 12);
    const amount = P * Math.pow((1 + R / (100 * N)), N * T_total);
    const CI = amount - P;

    document.getElementById("ciResult").innerHTML = `
      <p>Compound Interest: <strong>₹${CI.toFixed(2)}</strong></p>
      <p>Total Amount after ${T_years} years and ${T_months} months: <strong>₹${amount.toFixed(2)}</strong></p>
    `;
  });

  // 3. EMI Calculator
  document.getElementById("emiform")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const P = parseFloat(document.getElementById("loanAmount").value);
    const annualR = parseFloat(document.getElementById("annualRate").value);
    const N = parseInt(document.getElementById("loanTenure").value);

    if (isNaN(P) || isNaN(annualR) || isNaN(N) || P <= 0 || annualR <= 0 || N <= 0) {
      document.getElementById("emiResult").innerHTML = '<span class="text-danger">Please enter valid positive values in all fields.</span>';
      return;
    }

    const R = annualR / (12 * 100);
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    document.getElementById("emiResult").innerHTML = `
      <p>Monthly EMI: <strong>₹${emi.toFixed(2)}</strong></p>
      <p>Total Payment: <strong>₹${totalPayment.toFixed(2)}</strong></p>
      <p>Total Interest: <strong>₹${totalInterest.toFixed(2)}</strong></p>
    `;
  });

  // 4. SIP Calculator
  document.getElementById("sipForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const P = parseFloat(document.getElementById("sipMonthly").value);
    const annualRate = parseFloat(document.getElementById("sipRate").value);
    const years = parseInt(document.getElementById("sipYears").value);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      document.getElementById("sipResult").innerHTML = '<span class="text-danger">Please enter valid positive values in all fields.</span>';
      return;
    }

    const r = annualRate / 12 / 100;
    const n = years * 12;
    const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const totalInvested = P * n;
    const totalGain = futureValue - totalInvested;

    document.getElementById("sipResult").innerHTML = `
      <p>Future Value: <strong>₹${futureValue.toFixed(2)}</strong></p>
      <p>Total Invested: <strong>₹${totalInvested.toFixed(2)}</strong></p>
      <p>Estimated Gain: <strong>₹${totalGain.toFixed(2)}</strong></p>
    `;
  });

  // 5. Retirement Calculator
  document.getElementById("retirementForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const currentAge = parseInt(document.getElementById("currentAge").value);
    const retirementAge = parseInt(document.getElementById("retirementAge").value);
    const monthlyExpense = parseFloat(document.getElementById("monthlyExpense").value);
    const postYears = parseInt(document.getElementById("postRetirementYears").value);
    const inflation = parseFloat(document.getElementById("inflationRate").value);
    const returnRate = parseFloat(document.getElementById("returnRate").value);
    
    if (isNaN(currentAge) || isNaN(retirementAge) || isNaN(monthlyExpense) || 
        isNaN(postYears) || isNaN(inflation) || isNaN(returnRate) ||
        retirementAge <= currentAge || monthlyExpense <= 0) {
      document.getElementById("retirementResult").innerHTML = '<span class="text-danger">Please enter valid values. Retirement age must be greater than current age.</span>';
      return;
    }

    const yearsToRetirement = retirementAge - currentAge;
    const futureExpense = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetirement);
    const annualExpense = futureExpense * 12;
    const inflationAdjustedReturn = ((1 + returnRate / 100) / (1 + inflation / 100)) - 1;
    const corpus = annualExpense * ((1 - Math.pow(1 + inflationAdjustedReturn, -postYears)) / inflationAdjustedReturn);

    document.getElementById("retirementResult").innerHTML = `
      <p>Estimated Future Monthly Expense at Retirement: <strong>₹${futureExpense.toFixed(2)}</strong></p>
      <p>Estimated Retirement Corpus Required: <strong>₹${corpus.toFixed(2)}</strong></p>
    `;
  });

  // 6. BMI Calculator
  document.getElementById("bmiForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById("bmiWeight").value);
    const heightFeet = parseFloat(document.getElementById("bmiHeightFeet").value);

    if (isNaN(weight) || isNaN(heightFeet) || weight <= 0 || heightFeet <= 0) {
      document.getElementById("bmiResult").innerHTML = '<span class="text-danger">Please enter valid values for weight and height.</span>';
      return;
    }

    const heightM = heightFeet * 0.3048;
    const bmi = weight / (heightM * heightM);

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    document.getElementById("bmiResult").innerHTML = `
      <p>Your BMI is: <strong>${bmi.toFixed(2)}</strong></p>
      <p>Category: <strong>${category}</strong></p>
    `;
  });

  // 7. BMR Calculator
  document.getElementById("bmrForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById("bmrAge").value);
    const weight = parseFloat(document.getElementById("bmrWeight").value);
    const heightFeet = parseFloat(document.getElementById("bmrHeightFeet").value);
    const heightInches = parseFloat(document.getElementById("bmrHeightInches").value);
    const gender = document.getElementById("bmrGender").value;

    if (isNaN(age) || isNaN(weight) || isNaN(heightFeet) || isNaN(heightInches) ||
        age <= 0 || weight <= 0 || heightFeet < 0 || heightInches < 0 || heightInches > 11) {
      document.getElementById("bmrResult").innerHTML = '<span class="text-danger">Please enter valid values. Inches should be between 0-11.</span>';
      return;
    }

    const totalInches = (heightFeet * 12) + heightInches;
    const heightCm = totalInches * 2.54;
    let bmr = 0;

    if (gender === "male") {
      bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
    }

    document.getElementById("bmrResult").innerHTML = `
      <p>Your BMR is: <strong>${bmr.toFixed(2)} calories/day</strong></p>
      <p>This is the number of calories your body burns at rest.</p>
    `;
  });

  // 8. TDEE Calculator
  document.getElementById("tdeeForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const bmr = parseFloat(document.getElementById("tdeeBMR").value);
    const activityFactor = parseFloat(document.getElementById("activityLevel").value);

    if (isNaN(bmr) || isNaN(activityFactor) || bmr <= 0) {
      document.getElementById("tdeeResult").innerHTML = '<span class="text-danger">Please enter a valid BMR and select an activity level.</span>';
      return;
    }

    const tdee = bmr * activityFactor;

    document.getElementById("tdeeResult").innerHTML = `
      <p>Your estimated daily calorie needs (TDEE): <strong>${tdee.toFixed(2)} calories/day</strong></p>
      <p>This is the number of calories you need to maintain your current weight.</p>
    `;
  });

  // 9. Body Fat Calculator
  document.getElementById("bfGender")?.addEventListener("change", function() {
    const gender = this.value;
    document.getElementById("hipField").style.display = gender === "female" ? "block" : "none";
  });

  document.getElementById("bodyFatForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const gender = document.getElementById("bfGender").value;
    const height = parseFloat(document.getElementById("bfHeight").value);
    const neck = parseFloat(document.getElementById("bfNeck").value);
    const waist = parseFloat(document.getElementById("bfWaist").value);
    const hip = parseFloat(document.getElementById("bfHip").value);

    if (isNaN(height) || isNaN(neck) || isNaN(waist) || height <= 0 || neck <= 0 || waist <= 0) {
      document.getElementById("bodyFatResult").innerHTML = '<span class="text-danger">Please enter all required fields with valid values.</span>';
      return;
    }

    let bodyFat = 0;

    if (gender === "male") {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      if (isNaN(hip) || hip <= 0) {
        document.getElementById("bodyFatResult").innerHTML = '<span class="text-danger">Please enter hip measurement for females.</span>';
        return;
      }
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
    }

    document.getElementById("bodyFatResult").innerHTML = `
      <p>Your estimated Body Fat %: <strong>${bodyFat.toFixed(2)}%</strong></p>
    `;
  });

  // 10. Ideal Weight Calculator
  document.getElementById("idealWeightForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const gender = document.getElementById("idealGender").value;
    const heightFeet = parseFloat(document.getElementById("idealHeightFeet").value);

    if (isNaN(heightFeet) || heightFeet <= 0) {
      document.getElementById("idealWeightResult").innerHTML = '<span class="text-danger">Please enter a valid height in feet.</span>';
      return;
    }

    const heightInches = heightFeet * 12;
    let idealWeight = 0;

    if (gender === "male") {
      idealWeight = 50 + 2.3 * (heightInches - 60);
    } else {
      idealWeight = 45.5 + 2.3 * (heightInches - 60);
    }

    idealWeight = idealWeight < 0 ? 0 : idealWeight;

    document.getElementById("idealWeightResult").innerHTML = `
      <p>Your ideal weight is: <strong>${idealWeight.toFixed(2)} kg</strong></p>
      <p>This is based on the Devine formula for healthy weight.</p>
    `;
  });

  // 11. Percentage Calculator 
  document.getElementById("percentageForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const base = parseFloat(document.getElementById("baseValue").value);
    const percent = parseFloat(document.getElementById("percentageValue").value);
    const operation = document.getElementById("operation").value;
    let resultText = "";
  
    if (isNaN(base) || isNaN(percent)) {
      resultText = "Please enter valid numbers.";
    } else {
      switch (operation) {
        case "findPercentOf":
          resultText = `${percent}% of ${base} is <strong>${((percent / 100) * base).toFixed(2)}</strong>`;
          break;
        case "findPercentWhat":
          resultText = `${percent} is <strong>${((percent / base) * 100).toFixed(2)}%</strong> of ${base}`;
          break;
        case "increaseBy":
          resultText = `${base} increased by ${percent}% is <strong>${(base + (percent / 100) * base).toFixed(2)}</strong>`;
          break;
        case "decreaseBy":
          resultText = `${base} decreased by ${percent}% is <strong>${(base - (percent / 100) * base).toFixed(2)}</strong>`;
          break;
      }
    }
  
    document.getElementById("percentageResult").innerHTML = `<div class="alert alert-info">${resultText}</div>`;
  });

  // 12. Average Calculator
  document.getElementById("averageForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const input = document.getElementById("averageInput").value;
    const numbers = input
      .split(",")
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num));
  
    if (numbers.length === 0) {
      document.getElementById("averageResult").innerHTML =
        '<div class="alert alert-danger">Please enter valid numbers.</div>';
      return;
    }
  
    const total = numbers.reduce((acc, curr) => acc + curr, 0);
    const avg = total / numbers.length;
  
    document.getElementById("averageResult").innerHTML = `
      <div class="alert alert-success">
        The average of [${numbers.join(", ")}] is <strong>${avg.toFixed(2)}</strong>
      </div>`;
  });

  // 13. Percentage Change Calculator
  document.getElementById("percentageChangeForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const initial = parseFloat(document.getElementById("initialValue").value);
    const final = parseFloat(document.getElementById("finalValue").value);
  
    if (isNaN(initial) || isNaN(final) || initial === 0) {
      document.getElementById("percentageChangeResult").innerHTML =
        '<div class="alert alert-danger">Please enter valid and non-zero initial value.</div>';
      return;
    }
  
    const change = ((final - initial) / initial) * 100;
    const sign = change > 0 ? "Increase" : change < 0 ? "Decrease" : "No Change";
  
    document.getElementById("percentageChangeResult").innerHTML = `
      <div class="alert alert-${sign === "No Change" ? "secondary" : "success"}">
        ${sign}: <strong>${Math.abs(change).toFixed(2)}%</strong>
      </div>`;
  });

  // 14. Ratio Simplifier Calculator 
  document.getElementById("ratioForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const a = parseInt(document.getElementById("ratioA").value);
    const b = parseInt(document.getElementById("ratioB").value);
  
    function gcd(x, y) {
      return y === 0 ? x : gcd(y, x % y);
    }
  
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      document.getElementById("ratioResult").innerHTML =
        '<div class="alert alert-danger">Please enter valid positive numbers.</div>';
      return;
    }
  
    const divisor = gcd(a, b);
    const simplifiedA = a / divisor;
    const simplifiedB = b / divisor;
  
    document.getElementById("ratioResult").innerHTML = `
      <div class="alert alert-success">
        Simplified Ratio: <strong>${simplifiedA} : ${simplifiedB}</strong>
      </div>
    `;
  });

  // 15. Discount Calculator 
  document.getElementById("discountForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const price = parseFloat(document.getElementById("originalPrice").value);
    const discount = parseFloat(document.getElementById("discountPercent").value);
  
    if (isNaN(price) || isNaN(discount) || price < 0 || discount < 0 || discount > 100) {
      document.getElementById("discountResult").innerHTML =
        '<div class="alert alert-danger">Please enter valid price and discount values.</div>';
      return;
    }
  
    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
  
    document.getElementById("discountResult").innerHTML = `
      <div class="alert alert-success">
        Discount Amount: ₹<strong>${discountAmount.toFixed(2)}</strong><br/>
        Final Price: ₹<strong>${finalPrice.toFixed(2)}</strong>
      </div>
    `;
  });

  // 16. Age Calculator
  document.getElementById("ageForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const birthDate = new Date(document.getElementById("birthDate").value);
    const today = new Date();
  
    if (birthDate > today) {
      document.getElementById("ageResult").innerHTML = '<div class="alert alert-danger">Birth date cannot be in the future.</div>';
      return;
    }
  
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
  
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    document.getElementById("ageResult").innerHTML = `
      <div class="alert alert-info">
        You are <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days old.
      </div>
    `;
  });

  // 17. Date Difference Calculator
  document.getElementById("dateDiffForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const start = new Date(document.getElementById("startDate").value);
    const end = new Date(document.getElementById("endDate").value);
  
    if (start > end) {
      document.getElementById("dateDiffResult").innerHTML = '<div class="alert alert-danger">Start date must be before end date.</div>';
      return;
    }
  
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffYears = end.getFullYear() - start.getFullYear();
  
    document.getElementById("dateDiffResult").innerHTML = `
      <div class="alert alert-info">
        <strong>${diffDays}</strong> days<br />
        <strong>${diffWeeks}</strong> weeks<br />
        <strong>${diffYears}</strong> year(s) difference
      </div>
    `;
  });

  // 18. Countdown Timer Calculator
  document.getElementById("countdownForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
  
    clearInterval(window.countdownInterval); // clear any existing countdown
  
    const targetDate = new Date(document.getElementById("countdownDate").value);
  
    function updateCountdown() {
      const now = new Date();
      const timeLeft = targetDate - now;
  
      if (timeLeft <= 0) {
        clearInterval(window.countdownInterval);
        document.getElementById("countdownDisplay").innerHTML = '<span class="text-danger">Time\'s up!</span>';
        return;
      }
  
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
  
      document.getElementById("countdownDisplay").innerHTML = `
        ${days}d ${hours}h ${minutes}m ${seconds}s remaining
      `;
    }
  
    updateCountdown(); // initial call
    window.countdownInterval = setInterval(updateCountdown, 1000);
  });

  // 19. Random Number Generator
  document.getElementById("randomNumberForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const min = parseInt(document.getElementById("minValue").value);
    const max = parseInt(document.getElementById("maxValue").value);
  
    if (min > max) {
      document.getElementById("randomNumberResult").innerHTML = '<span class="text-danger">Min should be less than or equal to Max</span>';
      return;
    }
  
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById("randomNumberResult").innerHTML = `🎲 Random Number: <strong>${randomNum}</strong>`;
  });

  // 20. Unit Converter (Length)
  document.getElementById("unitConverterForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
  
    const conversionRates = {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      inch: 39.3701,
      foot: 3.28084,
      mile: 0.000621371
    };
  
    const inputLength = parseFloat(document.getElementById("inputLength").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
  
    const valueInMeters = inputLength / conversionRates[fromUnit];
    const convertedValue = valueInMeters * conversionRates[toUnit];
  
    document.getElementById("unitConverterResult").innerHTML = `✅ ${inputLength} ${fromUnit}(s) = <strong>${convertedValue.toFixed(4)}</strong> ${toUnit}(s)`;
  });
});