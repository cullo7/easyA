$curl = curl_init();

curl_setopt_array($curl, array(
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_URL => 'URLHERE',
	CURLOPT_USERAGENT => 'cURL Request for RMP data',
	CURLOPT_POST => 1,
	CULOPT_POSTFIELDS => array(
		item1 => prof,
		item2 => class

	)
));

$resp = curl_exec($curl);

curl_close($curl);