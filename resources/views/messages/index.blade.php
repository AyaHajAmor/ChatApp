@extends('layouts.app')

@section('content')
<div class="container">

    <div class="row">

        
        <div class="col-md-3 ">

                <h3>Online Users </h3>
                <hr> 

                <h5 id="no-online-users">No Online Users </h5>

            <ul class="list-group " id="online-users">

                
                
            
            </ul><!-- end of list group -->

        </div><!-- end of col -->
        <div class="col-md-9 d-flex flex-column" style="height: 80vh">
            <div class="h-100 bg-dark mb-4 p-5" id="chat" style="overflow-y:scroll;">

                @foreach ($messages as $message )
            <div class="mt-4 w-50 text-white p-3  bg-primary rouded {{auth()->user()->id == $message->user_id ? 'float-right bg-primary' :'float-left bg-secondary'}}">
            <p>{{ $message->user->name }} :</p>
                <p>{{ $message->body}}</p>
            </div>
            <div class="clearfix"></div>
                @endforeach

            </div>
            <form action="" class="d--flex">
            <input type="text" name="" data-url="{{ route('messages.store')}}" style="margin-right:10px w-5" class="col-9" id="chat-text">
            <button type="button" class="btn btn-dark col-2">Send</button>
            </form>
        </div>

    </div><!-- end of row -->

</div><!-- end of container -->


@stop