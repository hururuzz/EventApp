function add(num1, num2)
  {
    return num1 + num2;
  }

  function subtract(num1, num2)
  {
    return num1 - num2;
  }

  function multiply(num1, num2)
  {
    return num1 * num2;
  }

  function addNumbers()
  {
    var v1 = document.getElementById("value1").value;
    var v2 = document.getElementById("value2").value;

    v1 = parseInt(v1);
    v2 = parseInt(v2);

    var v3 = v1 + v2;

    document.getElementById("value3").value = v3;
  }