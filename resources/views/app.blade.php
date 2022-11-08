<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- JS SCRIPTS -->
    <script type="text/javascript" src="{{asset("js/jquery-3.6.0.js")}}"></script>
    <script type="text/javascript" src="{{asset("js/bootstrap.min.js")}}"></script>
    <script type="text/javascript" src="{{asset("js/fontawesome.min.js")}}"></script>
    <script type="text/javascript" src="{{asset("js/sb-admin-2.min.js")}}"></script>

    <!-- CSS STYLES -->
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
    <link rel="stylesheet" href="{{asset("css/all.min.css")}}">
    <link rel="stylesheet" href="{{asset("css/fontawesome.min.css")}}">
    <link rel="stylesheet" href="{{asset("css/styles.css")}}">
    <link rel="stylesheet" href="{{asset("css/sb-admin-2.min.css")}}">
    <link rel="stylesheet" href="{{asset("css/bootstrap.min.css")}}">
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <title>@yield('title')</title>

</head>

<body id="bg-white">


    <div id="app">
        <app></app>
    </div>

    <!-- CUSTOM JS SCRIPTS -->
    {{--  @stack('Scripts') --}}
    <script>
        window.Laravel = {
            csrfToken: '{{ csrf_token() }}'
        }

    </script>

    <script src="{{mix("js/app.js")}}"></script>

</body>

</html>
