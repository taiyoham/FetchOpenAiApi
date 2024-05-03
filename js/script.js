$(document).ready(function(){
    $("#fetch-button").on("click", function(){
        const questionText = $("textarea[name='question-text']").val();



        
		const prompt = questionText;
		const api_key = OpenAiKey;
		const url = `https://api.openai.com/v1/chat/completions`;
		const data = {
			"messages": [{"role": "user", "content": questionText}],
			temperature: 0.7,
			n: 10,
			model: "gpt-3.5-turbo"
		};


		$.ajax({
			type: "POST",
			url: url,
			headers: {
				"Authorization": "Bearer " + api_key,
				"Content-Type": "application/json"
			},
			data: JSON.stringify(data),
			success: function (data) {
				if(data.choices[0].message.content == '' || data.choices[0].message.content == null) {
					$("#return-p").css("display", "block");
					$("#return-p").text("応答無し");
				} else {
					$("#return_p").css("display", "block");
					const returnText = data.choices[0].message.content;
					showText = returnText.replace(/\n/g, "<br>");
					$("#return-p").text(showText);
				}
			},
			error: function(error) {
				$("#return_p").text(error);
				$("#return_p").text("エラー発生\n再度お試し下さい。");
				// console.log(error.status);
				// console.log(error.responseText);
			}
		});
    });
});