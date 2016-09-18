<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title>Easy A: About</title>

		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="stylesheet" href="/main.css" crossorigin="anonymous">
	</head>
	<body>
		<?php include $_SERVER["DOCUMENT_ROOT"] . "/header.php"; ?>
		
		<div class="container">
			<div class="jumbotron">
				<h1>Easy A <i>for Cornell</i></h1>
				<p>Results</p>
			</div>
			<div class="row">
				<div class="col-md-12">
					<h2>Here's what we know...</h2>
					<h3>Based on getting an [Grade] in [Professor]'s [Course]</h3>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 text-center">
					<div class="well well-lg">
						<h4>Workload per Week:</h4>
					</div>
				</div>
				<div class="col-md-4 text-center">
					<div class="well well-lg">
						<h4>Another Metric:</h4>
					</div>
				</div>
				<div class="col-md-4 text-center">
					<div class="well well-lg">
						<h4>Something Else:</h4>
					</div>
				</div>
			</div>

			<?php include $_SERVER["DOCUMENT_ROOT"] . "/footer.php"; ?>
		</div>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
		<script src="app.js"></script>
	</body>
</html>