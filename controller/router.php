<?php
	function __autoload($className){
		list($filename,$suffix)=explode('_', $className);
		$file=SERVER_ROOT.'/model/'.strtolower($filename).'.php';
		if(file_exists($file)){
			include_once($file);
		}else{
			die("File '$filename' containing '$className' not found. ");
		}
	}

	$request=$_SERVER['QUERY_STRING'];
	if($request==''){
		$page='index';
	}else{
		$postdata=$_POST;
		$getVars['postdata']=$postdata;
		$parsed=explode('&', $request);
		$page=array_shift($parsed);

		
		foreach ($parsed as $argument) {
			list($variable,$value)=explode('=', $argument);
			$getVars[$variable]=$value;
		}
	}
	if($page==''){
		$page='index';
	}
	$target=SERVER_ROOT.'/controller/'.$page.'.php';
	if(file_exists($target)){
		include_once($target);

		$class=ucfirst($page).'_Controller';

		if(class_exists($class)){
			$controller=new $class;
		}else{
			die('class does not exist!');
		}
	}else{
		die('page does not exist!');
	}

	$controller->main($getVars);
?>