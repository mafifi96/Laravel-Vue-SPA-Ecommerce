<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <script src="{{asset('js/jquery-3.6.0.js')}}"></script>
    <link rel="stylesheet" href="{{mix('css/app.css')}}">

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <title>Store</title>

</head>

<body id="bg-white">

<div>
    <div id="app">
        <app></app>
    </div>
<div>
    <!-- CUSTOM JS SCRIPTS -->
    {{--  @stack('Scripts') --}}
    <script>
        window.Laravel = {
            csrfToken: '{{ csrf_token() }}'
        }

    </script>

    <script src="{{mix('js/app.js')}}"></script>

</body>

</html>
