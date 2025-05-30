@extends('layouts/master')

@section('title')
Top Header Offer
@endsection

@push('custom_css')
 <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
@endpush

@section('content')
<section class="content">
	<div class="container-fluid">
		
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="card">
					<div class="header">
						<h2><i class="fa fa-th"></i> Top Header Offer </h2>
					</div>
					<div class="body">
						<form id="form" action="{{ route('admin.offer.update') }}" method="post" enctype="multipart/form-data" autocomplete="off">
						@csrf
						
							<input type="hidden" name="id" value="@if(!empty($result)){{$result['id']}}@else{{0}}@endif"  required />
							<div class="row clearfix">
								
								<div class="col-sm-12">
									<div class="form-group">
										<div class="form-line">
											<label for="inputName">Title <label class="text-danger">*</label></label>
											<input type="text" class="form-control" name="title" value="@if(!empty($result)){{ $result['title'] }}@else @endif"  required />
										</div>
									</div>
								</div>
								<div class="col-sm-12">
									<div class="form-group">
										<div class="form-line">
											<label for="inputName">Enter Link <label class="text-danger">*</label></label>
											<input type="text" class="form-control" name="link" value="@if(!empty($result)){{ $result['link'] }}@else @endif"  required />
										</div>
									</div>
								</div>
							</div>
							
							<div class="col-lg-12 p-t-20 text-center">
								
								<button style="background:#353c48;" type="submit" class="btn btn-primary waves-effect m-r-15" >Update</button> 
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
@endsection

@push('custom_js')

	<script>
		function resetFormData(){
			
			$('.previewimages').html('');
		}
	</script>

    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
	
	<script>

		$('#summernote').summernote({
			placeholder: 'Enter Description',
			tabsize: 2,
			height: 200,
		});

		// 'use strict';
		// $(function () {
			// CKEditor
			// CKEDITOR.replace('ckeditor');
			// CKEDITOR.config.height = 200;

			
		// });
		
		// CKEDITOR.on('instanceReady', function(){
		   // $.each( CKEDITOR.instances, function(instance) {
			// CKEDITOR.instances[instance].on("change", function(e) {
				// for ( instance in CKEDITOR.instances )
				// CKEDITOR.instances[instance].updateElement();
			// });
		   // });
		// });
	</script>
@endpush