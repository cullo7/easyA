<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title>Easy A: Home</title>

		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="stylesheet" href="/main.css" crossorigin="anonymous">
	</head>
	<body>
		<?php include $_SERVER["DOCUMENT_ROOT"] . "/header.php"; ?>
		
		<div class="container">
			<div class="jumbotron">
				<h1>Easy A <i>for Cornell</i></h1>
				<p>Check a course's workload and learn about a professor from aggregated ratings</p>
			</div>
			<div class="row">
				<div class="col-md-12">
					<h2>Input your Professor, Class, and Desired Grade.</h2>
				</div>
			</div>
			
			<form>
				<div class="form-group">
					<label for="professorField">Professor</label>
					<input type="text" class="form-control" id="professorField" placeholder="Professor">
				</div>
				<div class="form-group">
					<label for="courseField">Course</label>
					<input type="text" class="form-control" id="courseField" placeholder="Course (No Spaces)">
				</div>
				<div class="form-group">
					<label for="gradeField">Desired Grade</label>
					<select class="form-control" id="gradeField">
						<option>A</option>
						<option>B</option>
						<option>C</option>
						<option>D</option>
						<option>F</option>
					</select>
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
			
			<?php include $_SERVER["DOCUMENT_ROOT"] . "/footer.php"; ?>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	</body>
</html>