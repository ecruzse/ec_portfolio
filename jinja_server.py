# import os

# import aiohttp_jinja2
# import jinja2
# from aiohttp import web


# router = web.RouteTableDef()

# async def init_app() -> web.Application:
#     app = web.Application()
#     app.add_routes(router)
#     aiohttp_jinja2.setup(
#         app, loader=jinja2.FileSystemLoader(os.path.join(os.getcwd(), "templates"))
#     )
#     return app

# @router.get("/")
# async def homepage(request: web.Request) -> web.Response:
#     context = {
#         "url_for": "./static/calculatorOld.js"
#     } # enter variables to populate template with
#     response = aiohttp_jinja2.render_template(
#                     "calculatorOld.html",
#                     request,
#                     context=context
#                 )
#     return response


# if __name__ == "__main__":
#     web.run_app(init_app(), port=3000)