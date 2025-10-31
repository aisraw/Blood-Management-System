
        function goToHome() {
            window.location.href = "main.html";
        }
        
        function showSteps() {
            document.getElementById('initialPrompt').style.display = 'none';
            document.getElementById('stepsContent').style.display = 'block';
        }
        
        function showSuccessMessage() {
            document.getElementById('stepsContent').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        }
        
        function showFunnyMessage() {
            document.getElementById('initialPrompt').style.display = 'none';
            document.getElementById('funnyMessage').style.display = 'block';
        }
        
        function resetProcess() {
            document.getElementById('initialPrompt').style.display = 'block';
            document.getElementById('stepsContent').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('funnyMessage').style.display = 'none';
        }
    