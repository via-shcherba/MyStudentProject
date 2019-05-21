<div class="text">
	<h1>Авторизация</h1>
	<img src="img/stripeML.png" alt="полоса"/>
	<img src="img/spikeletML.png" alt="колосок"/>
	<div class="textIn">
		<h3 class="blinking">Ошибка ввода!</h3>
		<p style="text-align:center;margin-bottom:10px;color:red;">
			Неправильное имя пользователя или пароль!
		</p>		
		<div class="authoriz">
			<form action="/onlayn-zakaz.html" method="POST">
				<input type="text" name="login" id="name" placeholder="*Имя пользователя"required>
				<input type="password" name="password" id="pass" placeholder="*Пароль" required>
				<input type="submit" value="войти">
			</form>
		</div>
	</div>
</div>