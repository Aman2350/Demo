@extends('layouts/master')

@section('title',__('Product Review List'))

@section('content')

<section class="content">
    <div class="container-fluid">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="card">
					<div class="header">
						<h2><i class="fa fa-th"></i>  Go To</h2>
					</div>
					<div class="body">
						<div class="btn-group top-head-btn">
                            <a class="btn-primary" href="{{ url('admin/catalog/product-review/add') }}">
                                <i class="fa fa-plus"></i> Add Product Review
							</a>
                        </div>
					</div>
				</div>
			</div>
		</div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="card">
					<div class="header">
						<h2><i class="fa fa-th"></i> Product Review List </h2>
					</div>
                    <div class="body">
                        <div class="table-">
                            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <table class="table table-hover js-basic-example contact_list dataTable"
                                            id="DataTables_Table_0" role="grid"
                                            aria-describedby="DataTables_Table_0_info">
                                            <thead>
                                                <tr role="row">
                                                    <th class="center sorting sorting_asc" tabindex="0"
                                                        aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                                                        style="width: 48.4167px;" aria-sort="ascending"
                                                        aria-label="#: activate to sort column descending">S. N.
													</th>
                                                    <th class="center sorting" tabindex="0"
                                                        aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                                                        style="width: 193.017px;"
                                                        aria-label=" Email : activate to sort column ascending"> Name
                                                    </th>
                                                    <th class="center sorting" tabindex="0"
                                                        aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                                                        style="width: 193.017px;"
                                                        aria-label=" Email : activate to sort column ascending"> Rating
                                                    </th>
                                                    <th class="center sorting" tabindex="0"
                                                        aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                                                        style="width: 193.017px;"
                                                        aria-label=" Email : activate to sort column ascending"> Product
                                                    </th>
                                                    <th class="center sorting" tabindex="0"
                                                        aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                                                        style="width: 193.017px;"
                                                        aria-label=" Email : activate to sort column ascending"> Description
                                                    </th>
													@if(\Auth::user()->designation_id=='1' || \Auth::user()->designation_id=='4')
														<th class="center sorting" tabindex="0"
															aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
															style="width: 193.017px;"
															aria-label=" Email : activate to sort column ascending"> Status
														</th>
														<th class="center sorting" tabindex="0"
															aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
															style="width: 85px;"
															aria-label=" Action : activate to sort column ascending"> Action
														</th>
													@endif
                                                </tr>
                                            </thead>
                                            <tbody>
												@if(!empty($result))
													@foreach($result as $key=>$value)
														<tr class="gradeX odd">
															<td class="center">{{ $key+1}}</td>
															<td class="center">{{ $value['name'] }}</td>
															<td class="center">{{ $value['rate'] }}</td>
                                                            @php $products = \App\Models\Variantproduct::select('variantproducts.*', 'products.name')->join('products','variantproducts.product_id','=','products.id')->orderBy('products.name','Asc')->where('variantproducts.id',$value['product_id'])->first(); @endphp
		
															<td class="center">@if($products){{$products->name}}-{{$products->sku_id}} @else N/A @endif</td>
															<td class="center">{{ $value['desc'] }}</td>
															
															@if(\Auth::user()->designation_id=='1' || \Auth::user()->designation_id=='4')
																<td class="center">
																	<div class="switch mt-3">
																		<label>
																			<input type="checkbox" class="-change" data-id="{{ $value['id'] }}" @if($value['status']=='1'){{ 'checked' }} @endif>
																			<span class="lever switch-col-red layout-switch"></span>
																		</label>
																	</div>
																</td>
																<td class="center">
																	
																	<a href="{{ url('admin/catalog/product-review/update/'.$value['id'] )}}" title="Update Product Review" class="btn btn-tbl-edit">
																		<i class="fas fa-pencil-alt"></i>
																	</a>
																	<a title="Delete Product Review" onclick="return confirm('Are you sure? You want to delete this Review.')" href="{{ url('admin/catalog/product-review/delete/'.$value['id'] )}}" class="btn btn-tbl-delete">
																		<i class="fas fa-trash"></i>
																	</a>
																</td>
															@endif
														</tr>
													@endforeach
												@endif
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th class="center" rowspan="1" colspan="1">#</th>
                                                    <th class="center" rowspan="1" colspan="1"> Name </th>
                                                    <th class="center" rowspan="1" colspan="1"> Rating </th>
                                                    <th class="center" rowspan="1" colspan="1"> Product </th>
                                                    <th class="center" rowspan="1" colspan="1"> Description </th>
													@if(\Auth::user()->designation_id=='1' || \Auth::user()->designation_id=='4')
														<th class="center" rowspan="1" colspan="1"> Status </th>
														<th class="center" rowspan="1" colspan="1"> Action </th>
													@endif
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection

@push('custom_js')
    <script>
        $('.-change').change(function() {
            var status = $(this).prop('checked') == true ? 1 : 0;
            var id = $(this).data('id');

            $.ajax({
                type: "POST",
                dataType: "json",
                url: "{{ route('admin.review.status') }}",
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
                data: {
                    'status': status, 
                    'id': id
                },
                beforeSend:function(){
                    $('#preloader').css('display','block');
                },
                error:function(xhr,textStatus){
					
                    if(xhr && xhr.responseJSON.message){
						sweetAlertMsg('error', xhr.status + ': ' + xhr.responseJSON.message);
					}else{
						sweetAlertMsg('error', xhr.status + ': ' + xhr.statusText);
					}
                    $('#preloader').css('display','none');
                },
                success: function(data){
					$('#preloader').css('display','none');
                    sweetAlertMsg('success',data.message);
                }
            });
		});
		
    </script>                                           
@endpush